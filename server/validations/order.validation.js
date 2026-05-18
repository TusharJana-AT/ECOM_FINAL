import z from "zod";

export const createOrderValidation = z.object({
  paymentMethod: z.enum(["COD", "UPI"]),

  shippingAddress: z.string().min(5),

  items: z
    .array(
      z.object({
        productId: z.number(),
        quantity: z.number().min(1),
      })
    )
    .min(1, "Order must contain at least one item"),
});