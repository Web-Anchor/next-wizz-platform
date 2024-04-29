type Props = {
  title?: string;
  children?: React.ReactNode;
  fetching?: boolean;
  disabled?: boolean;
  className?: string;
  style?: 'primary' | 'secondary' | 'ghost'; // Defaults to 'primary'
  type?: 'button' | 'submit' | 'reset';
};

export default function CustomBlackWhite(props: Props): React.ReactElement {
  return (
    <div className="bg-white p-10">
      <div className="flex justify-between">
        <div>
          <p className="text-gray-400 text-sm">YOUR</p>
          <p className="text-3xl font-bold text-gray-800">LOGO</p>
        </div>
        <div className="text-right">
          <p className="text-gray-800 font-semibold">NO. 000001</p>
        </div>
      </div>

      <div className="text-center my-6">
        <p className="text-5xl font-bold text-gray-800">INVOICE</p>
      </div>

      <div className="flex justify-between mb-10">
        <div>
          <p className="font-bold text-gray-600">Date:</p>
          <p className="text-gray-800">02 June, 2030</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-600">Billed to:</p>
          <p className="text-gray-800">Studio Shodwe</p>
          <p className="text-gray-800">123 Anywhere St., Any City</p>
          <p className="text-gray-800">hello@reallygreatsite.com</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-600">From:</p>
          <p className="text-gray-800">Olivia Wilson</p>
          <p className="text-gray-800">123 Anywhere St., Any City</p>
          <p className="text-gray-800">hello@reallygreatsite.com</p>
        </div>
      </div>

      <div className="border-t-2 border-b-2 border-gray-200 py-5">
        <div className="flex justify-between">
          <p className="text-gray-600 font-bold">Item</p>
          <p className="text-gray-600 font-bold">Quantity</p>
          <p className="text-gray-600 font-bold">Price</p>
          <p className="text-gray-600 font-bold">Amount</p>
        </div>
        <div className="flex justify-between mt-4">
          <p className="text-gray-800">Logo</p>
          <p className="text-gray-800">1</p>
          <p className="text-gray-800">$500</p>
          <p className="text-gray-800">$500</p>
        </div>
        <div className="flex justify-between mt-4">
          <p className="text-gray-800">Banner (2x6m)</p>
          <p className="text-gray-800">2</p>
          <p className="text-gray-800">$45</p>
          <p className="text-gray-800">$90</p>
        </div>
        <div className="flex justify-between mt-4">
          <p className="text-gray-800">Poster (1x2m)</p>
          <p className="text-gray-800">3</p>
          <p className="text-gray-800">$55</p>
          <p className="text-gray-800">$165</p>
        </div>
      </div>

      <div className="text-right py-5">
        <p className="text-gray-600 font-bold">Total</p>
        <p className="text-xl font-bold text-gray-800">$755</p>
      </div>

      <div className="mt-10">
        <p className="font-bold text-gray-600">Payment method:</p>
        <p className="text-gray-800">Cash</p>
      </div>
      <div className="mt-4">
        <p className="font-bold text-gray-600">Note:</p>
        <p className="text-gray-800">Thank you for choosing us!</p>
      </div>

      <div className="mt-10">
        <div className="h-32 bg-gray-200 rounded-b-lg relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-400 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
