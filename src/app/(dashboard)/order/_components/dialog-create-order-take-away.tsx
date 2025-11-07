import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createOrderTakeAway } from "../actions";
import { toast } from "sonner";
import { orderTakeAwayForm, orderTakeAwayFormSchema } from "@/validations/order-validation";
import { INITIAL_ORDER_TAKE_AWAY, INITIAL_STATE_ORDER_TAKE_AWAY } from "@/constants/order-constant";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function DialogCreateOrderTakeAway({ closeDialog }: { closeDialog: () => void }) {
  const form = useForm<orderTakeAwayForm>({
    resolver: zodResolver(orderTakeAwayFormSchema),
    defaultValues: INITIAL_ORDER_TAKE_AWAY,
  });

  const [createOrderState, createOrderAction, isPendingCreateOrder] = useActionState(
    createOrderTakeAway,
    INITIAL_STATE_ORDER_TAKE_AWAY
  );

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      createOrderAction(formData);
    });
  });

  useEffect(() => {
    if (createOrderState?.status === "error") {
      toast.error("Create Order Failed", {
        description: createOrderState.errors?._form?.[0],
      });
    }

    if (createOrderState?.status === "success") {
      toast.success("Create Order Success");
      form.reset();
      closeDialog();
    }
  }, [createOrderState]);

  return (
    <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>Create Order Take Away</DialogTitle>
          <DialogDescription>Add a new order from customer</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-4 max-h-[50vh] p-1 overflow-y-auto">
            <FormInput form={form} name="customer_name" label="Customer Name" placeholder="Insert customer name here" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">{isPendingCreateOrder ? <Loader2 className="animate-spin" /> : "Create"}</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
