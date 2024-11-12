import { createFileRoute } from "@tanstack/react-router";
import { ReactElement } from "react";
import { billQueryOptions } from "@/query/bill/options.ts";
import { cardsQueryOptions } from "@/query/card/options.ts";
import { customerQueryOptions } from "@/query/customer/options.ts";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { itemsQueryOptions } from "@/query/item/options.ts";
import { productsQueryOptions } from "@/query/product/options.ts";
import { ItemsDataTable } from "@/components/tables/items-data-table.tsx";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { categoriesQueryOptions } from "@/query/category/options.ts";
import { AddItemDialog } from "@/components/add-item-dialog.tsx";
import { subCategoriesQueryOptions } from "@/query/sub-category/options.ts";

export const Route = createFileRoute("/_auth/items/$billId")({
  loader: ({ context: { queryClient }, params: { billId } }) => {
    queryClient.ensureQueryData(billQueryOptions(billId));
    queryClient.ensureQueryData(itemsQueryOptions(billId));
    queryClient.ensureQueryData(cardsQueryOptions);
  },
  component: ItemsComponent,
});

function ItemsComponent(): ReactElement {
  const billId = Route.useParams().billId;

  const billQuery = useSuspenseQuery(billQueryOptions(billId));
  const bill = billQuery.data;

  const itemsQuery = useSuspenseQuery(itemsQueryOptions(billId));
  const items = itemsQuery.data;

  const cardsQuery = useSuspenseQuery(cardsQueryOptions);
  const cards = cardsQuery.data;

  const customerQuery = useSuspenseQuery(
    customerQueryOptions(bill?.customerId?.toString()),
  );
  const customer = customerQuery.data;

  const productsQuery = useSuspenseQuery(productsQueryOptions);
  const products = productsQuery.data;

  const categoryQuery = useSuspenseQuery(categoriesQueryOptions);
  const categories = categoryQuery.data;

  const subCategoryQuery = useQuery(subCategoriesQueryOptions(null));
  const subCategories = subCategoryQuery.data;

  if (
    billQuery.isFetching ||
    cardsQuery.isFetching ||
    customerQuery.isFetching ||
    itemsQuery.isFetching ||
    productsQuery.isFetching ||
    categoryQuery.isFetching ||
    subCategoryQuery.isFetching
  )
    return <div>Loading...</div>;
  if (
    !bill ||
    !cards ||
    !customer ||
    !items ||
    !products ||
    !categories ||
    !subCategories
  )
    return <div>Something went wrong</div>;

  return (
    <div className="mx-auto max-w-wrapper-desktop xxl:px-0 px-4 flex flex-col w-full relative">
      <div className="flex md:flex-row flex-col md:justify-between gap-6 my-20">
        <div className="flex flex-row md:items-center h-fit gap-8">
          <h1 className="font-semibold xl:text-4xl lg:text-2xl text-xl">
            {`${customer.name} ${customer.surname}`}
          </h1>
          <AddItemDialog
            categories={categories}
            products={products}
            subCategories={subCategories}
            billId={billId}
          >
            <Button>
              <Plus />
            </Button>
          </AddItemDialog>
        </div>
        <div className="flex gap-2 md:gap-4 sm:text-lg text-sm">
          <div className="flex flex-col">
            <p>Customer ID:</p>
            <p>Bill ID:</p>
            <p>Telephone:</p>
            <p>Email:</p>
          </div>

          <div className="flex flex-col">
            <p>{customer.id}</p>
            <p>{bill.id}</p>
            <a
              className="text-blue-600 hover:underline"
              href={`tel:${customer.telephone}`}
            >
              {customer.telephone}
            </a>

            <a
              className="text-blue-600 hover:underline"
              href={`mailto:${customer.email}`}
            >
              {customer.email}
            </a>
          </div>
        </div>
      </div>

      <ItemsDataTable
        itemsData={items.map((item) => {
          return {
            id: item.id,
            guid: item.guid,
            name: products.find((p) => p.id === item.productId)?.name ?? "",
            productNumber:
              products.find((p) => p.id === item.productId)?.productNumber ??
              "",
            pricePerPeace:
              products.find((p) => p.id === item.productId)?.price ?? NaN,
            totalPrice: item.totalPrice,
            quantity: item.quantity,
            color: products.find((p) => p.id === item.productId)?.color ?? "",
          };
        })}
      />
    </div>
  );
}
