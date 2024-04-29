type Props = {
  title?: string;
  children?: React.ReactNode;
  fetching?: boolean;
  disabled?: boolean;
  className?: string;
  style?: 'primary' | 'secondary' | 'ghost'; // Defaults to 'primary'
  type?: 'button' | 'submit' | 'reset';
};

export default function CustomBlackWhiteFramed(
  props: Props
): React.ReactElement {
  return (
    <div
      className="bg-white shadow-lg rounded-lg p-8 overflow-hidden mx-auto"
      style={{ maxWidth: '794px', fontFamily: 'sans-serif' }}
    >
      <div className="flex justify-between items-center border-b-2 pb-4">
        <div>
          <h2 className="text-4xl font-bold uppercase">Invoice</h2>
          <div className="mt-2">
            <p className="font-medium">
              Invoice No: <span className="font-normal">00000001</span>
            </p>
            <p className="font-medium">
              Date: <span className="font-normal">12 October, 2025</span>
            </p>
          </div>
        </div>
        <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-3xl font-bold text-purple-700">
            Salford & Co.
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex-1">
          <h3 className="font-bold">Bill to:</h3>
          <p>Liceria & Co.</p>
          <p>123 Anywhere St.,</p>
          <p>Any City, ST 12345</p>
        </div>
        <div className="text-right ml-4">
          <p className="text-sm">123 Anywhere St., Any City, ST 12345</p>
          <p className="text-sm">Tel: +1-235-7890</p>
        </div>
      </div>

      <div className="mt-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2">
              <th className="pb-2">Item</th>
              <th className="pb-2">Description</th>
              <th className="pb-2">Price</th>
              <th className="pb-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">1.</td>
              <td>Logo Design</td>
              <td>$200</td>
              <td>$200</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">2.</td>
              <td>Advertising Design</td>
              <td>$500</td>
              <td>$500</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">3.</td>
              <td>Poster Design</td>
              <td>$500</td>
              <td>$500</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">4.</td>
              <td>Brochure Design</td>
              <td>$200</td>
              <td>$200</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">5.</td>
              <td>Content Writer</td>
              <td>$500</td>
              <td>$500</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <div className="text-right">
          <h3 className="font-bold text-lg">Total</h3>
          <p className="text-xl font-bold">$1900</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="font-medium">
          Bank Name: <span className="font-normal">Olivia Wilson</span>
        </p>
        <p className="font-medium">
          Bank Account: <span className="font-normal">0123 4567 8901</span>
        </p>
      </div>

      <div className="mt-4 text-sm text-center">
        <p>
          If you have any question please contact: hello@reallygreatsite.com
        </p>
      </div>
    </div>
  );
}
