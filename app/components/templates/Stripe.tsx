type Props = {
  title?: string;
  children?: React.ReactNode;
  fetching?: boolean;
  disabled?: boolean;
  className?: string;
  style?: 'primary' | 'secondary' | 'ghost'; // Defaults to 'primary'
  type?: 'button' | 'submit' | 'reset';
};

export default function Stripe(props: Props): React.ReactElement {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-8 m-2">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-800">Invoice</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Loop Shop</p>
      </div>
      <div className="px-4 py-5 sm:p-6 grid grid-cols-2 gap-6">
        <div>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Invoice number 6000313D-DRAFT
          </p>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Date due April 28, 2024
          </p>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            hello world template testing
          </p>
        </div>
        <div>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Loop Shop</p>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            +44 7565 809611
          </p>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Bill to Bob</p>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Puerto Rico</p>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            lookatemail@gmail.com
          </p>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg leading-6 font-medium text-gray-800">
          £0.00 due April 28, 2024
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">memo</p>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Qty
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Unit price
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Repeat for each item */}
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-800">
                Item description
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-800">
                1
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-800">
                £0.00
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-800">
                £0.00
              </td>
            </tr>
            {/* End repeat */}
          </tbody>
        </table>
        <div className="flex justify-between items-center py-4">
          <p>Subtotal</p>
          <p>£0.00</p>
        </div>
        <div className="flex justify-between items-center py-4">
          <p>Total</p>
          <p>£0.00</p>
        </div>
        <div className="flex justify-between items-center py-4">
          <p>Amount due</p>
          <p>£0.00</p>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6 text-sm text-gray-500">footer</div>
    </div>
  );
}
