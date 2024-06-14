type Customer = {
  zip: string;
  city: string;
  name: string;
  state: string;
  address: string;
  country: string;
};

type LineItem = {
  tax: string;
  item: string;
  price: string;
  total: string;
  quantity: string;
  description: string;
};

type Props = {
  date?: string;
  dueDate?: string;
  customer?: Customer;
  lineItems?: LineItem[];
  invoiceTotal?: string;
  invoiceNumber?: string;
};

export default function CustomBlackWhite(props?: Props): React.ReactElement {
  return (
    <div className="container border-t-4 border-yellow-500">
      <div className="flex flex-row justify-between my-6">
        <div className="flex">
          <img
            src="https://res.cloudinary.com/dkpz9r2q7/image/upload/v1673288813/surfsup_scqki2.png"
            className="h-20"
          />
          <div className="ml-4">
            <p className="text-3xl mb-2">Invoice</p>
            <p className="text-xl">#{props?.invoiceNumber}</p>
          </div>
        </div>
        <div className="text-right text-gray-700">
          <p className="text-lg font-bold text-gray-800">Surfsup</p>
          <p>2578 Palm Tree Way</p>
          <p>Beach City, FL 30001</p>
          <p>United States</p>
        </div>
      </div>
      <hr />
      <div className="flex flex-row justify-between my-4">
        <div>
          <p className="uppercase text-xs text-gray-600 mb-">Bill To</p>
          <p>{props?.customer?.name}</p>
          <p>{props?.customer?.address}</p>
          <p>
            {props?.customer?.city}, {props?.customer?.state}{' '}
            {props?.customer?.zip}
          </p>
          <p>{props?.customer?.country}</p>
        </div>
        <div className="text-right">
          <div className="mb-2">
            <p className="uppercase text-xs text-gray-600">Invoice #</p>
            <p>{props?.invoiceNumber}</p>
          </div>
          <div className="mb-2">
            <p className="uppercase text-xs text-gray-600">Date</p>
            <p>{props?.date}</p>
          </div>
          <div className="mb-2">
            <p className="uppercase text-xs text-gray-600">Due Date</p>
            <p>{props?.dueDate}</p>
          </div>
        </div>
      </div>
      <hr />
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-800 pl-0">
              Item
            </th>
            <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-800">
              Description
            </th>
            <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-800">
              Quantity
            </th>
            <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-800 text-right">
              Price
            </th>
            <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-800 text-right">
              Tax
            </th>
            <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-800 pr-0 text-right">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {props?.lineItems?.map((lineItem, key) => (
            <tr key={key}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-800 pl-0">
                {lineItem.item}
              </td>
              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                {lineItem.description}
              </td>
              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                {lineItem.quantity}
              </td>
              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 text-right">
                {lineItem.price}
              </td>
              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 text-right">
                {lineItem.tax}
              </td>
              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 pr-0 text-right">
                {lineItem.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row justify-between mt-20">
        <div>
          <p className="text-gray-400 text-sm mb-2">
            We accept cash, check, and card
          </p>
          <p className="text-gray-400 text-sm">Thanks for your business!</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600 mb-2">Total</p>
          <p className="text-4xl font-bold text-gray-800">
            {props?.invoiceTotal}
          </p>
        </div>
      </div>
    </div>
  );
}
