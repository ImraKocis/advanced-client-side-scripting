import { ReactElement, ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ItemSelect } from "@/components/item-select.tsx";
import { Category } from "@/api/category/category.ts";
import { Product } from "@/api/product/product.ts";
import { SubCategory } from "@/api/sub-category/sub-category.ts";
import { Button } from "@/components/ui/button.tsx";
import { useMutation } from "@tanstack/react-query";
import { addItem, ItemCreate } from "@/api/item/item.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { queryClient } from "@/main.tsx";

interface AddItemDialogProps {
  children: ReactNode;
  categories: Category[];
  subCategories: SubCategory[];
  products: Product[];
  billId: string;
}
export function AddItemDialog({
  children,
  categories,
  products,
  subCategories,
  billId,
}: AddItemDialogProps): ReactElement {
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("1");
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: (item: ItemCreate) => addItem(item),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["items"] });
      toast({
        title: "Item added",
        description: "The item has been added to the bill list.",
      });
    },
    onError: (error) =>
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      }),
  });

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
          <DialogDescription>
            Add item to the bill list. Click Save Changes when done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-20 w-full">
          <div className="flex flex-col gap-10 w-full">
            <ItemSelect
              items={categories.map((category) => ({
                name: category.name,
                value: category.id.toString(),
              }))}
              onSelect={(value) => setCategory(value)}
              selected={category}
              placeholder="Category"
            />

            <ItemSelect
              items={
                category
                  ? subCategories
                      .filter((sc) => sc.categoryId.toString() === category)
                      .map((subCategory) => ({
                        name: subCategory.name,
                        value: subCategory.id.toString(),
                      }))
                  : subCategories?.map((subCategory) => ({
                      name: subCategory.name,
                      value: subCategory.id.toString(),
                    }))
              }
              onSelect={(value) => setSubCategory(value)}
              selected={subCategory}
              placeholder="Sub Category"
            />
          </div>
          <div className="flex flex-col gap-10 w-full">
            <ItemSelect
              items={
                subCategory
                  ? products
                      .filter((p) => p.subCategoryId.toString() === subCategory)
                      .map((prod) => ({
                        name: prod.name,
                        value: prod.id.toString(),
                      }))
                  : products.map((prod) => ({
                      name: prod.name,
                      value: prod.id.toString(),
                    }))
              }
              onSelect={(value) => setProduct(value)}
              selected={product}
              placeholder="Product"
            />
            <ItemSelect
              items={Array.from({ length: 10 }, (_, i) => ({
                name: (i + 1).toString(),
                value: (i + 1).toString(),
              }))}
              onSelect={(value) => setQuantity(value)}
              selected={quantity}
              placeholder="Quantity"
            />
          </div>
        </div>

        <div className="w-full flex justify-end">
          <Button
            disabled={!product}
            onClick={() =>
              mutation.mutate({
                productId: product,
                quantity: quantity,
                totalPrice: (
                  Number(
                    products.find((p) => p.id.toString() === product)?.price,
                  ) * Number(quantity)
                ).toString(),
                billId: billId,
              })
            }
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
