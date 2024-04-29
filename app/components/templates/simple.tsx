type Props = {
  title?: string;
  children?: React.ReactNode;
  fetching?: boolean;
  disabled?: boolean;
  className?: string;
  style?: 'primary' | 'secondary' | 'ghost'; // Defaults to 'primary'
  type?: 'button' | 'submit' | 'reset';
};

export default function Simple(props: Props): React.ReactElement {
  return (
    <div
      className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10"
      id="simple-invoice"
    >
      <div className="mb-5 pb-5 flex justify-between items-center border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Invoice</h2>
        </div>

        <div className="inline-flex gap-x-2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-600">
              Business Name
            </h2>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <div className="grid space-y-3">
            <dl className="grid sm:flex gap-x-3 text-sm">
              <dt className="min-w-36 max-w-[200px] text-gray-500">
                Billed to:
              </dt>
              <dd className="text-gray-800">
                <a
                  className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium"
                  href="#"
                >
                  sara@site.com
                </a>
              </dd>
            </dl>

            <dl className="grid sm:flex gap-x-3 text-sm">
              <dt className="min-w-36 max-w-[200px] text-gray-500">
                Billing details:
              </dt>
              <dd className="font-medium text-gray-800">
                <span className="block font-semibold">Sara Williams</span>
                <address className="not-italic font-normal">
                  280 Suzanne Throughway,
                  <br />
                  Breannabury, OR 45801,
                  <br />
                  United States
                  <br />
                </address>
              </dd>
            </dl>

            <dl className="grid sm:flex gap-x-3 text-sm">
              <dt className="min-w-36 max-w-[200px] text-gray-500">
                Shipping details:
              </dt>
              <dd className="font-medium text-gray-800">
                <span className="block font-semibold">Sara Williams</span>
                <address className="not-italic font-normal">
                  280 Suzanne Throughway,
                  <br />
                  Breannabury, OR 45801,
                  <br />
                  United States
                  <br />
                </address>
              </dd>
            </dl>
          </div>
        </div>

        <div>
          <div className="grid space-y-3">
            <dl className="grid sm:flex gap-x-3 text-sm">
              <dt className="min-w-36 max-w-[200px] text-gray-500">
                Invoice number:
              </dt>
              <dd className="font-medium text-gray-800">ADUQ2189H1-0038</dd>
            </dl>

            <dl className="grid sm:flex gap-x-3 text-sm">
              <dt className="min-w-36 max-w-[200px] text-gray-500">
                Currency:
              </dt>
              <dd className="font-medium text-gray-800">USD - US Dollar</dd>
            </dl>

            <dl className="grid sm:flex gap-x-3 text-sm">
              <dt className="min-w-36 max-w-[200px] text-gray-500">
                Due date:
              </dt>
              <dd className="font-medium text-gray-800">10 Jan 2023</dd>
            </dl>

            <dl className="grid sm:flex gap-x-3 text-sm">
              <dt className="min-w-36 max-w-[200px] text-gray-500">
                Billing method:
              </dt>
              <dd className="font-medium text-gray-800">Send invoice</dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="mt-6 border border-gray-200 p-4 rounded-lg space-y-4">
        <div className="hidden sm:grid sm:grid-cols-5">
          <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
            Item
          </div>
          <div className="text-start text-xs font-medium text-gray-500 uppercase">
            Qty
          </div>
          <div className="text-start text-xs font-medium text-gray-500 uppercase">
            Rate
          </div>
          <div className="text-end text-xs font-medium text-gray-500 uppercase">
            Amount
          </div>
        </div>

        <div className="hidden sm:block border-b border-gray-200"></div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          <div className="col-span-full sm:col-span-2">
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Item
            </h5>
            <p className="font-medium text-gray-800">Design UX and UI</p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Qty
            </h5>
            <p className="text-gray-800">1</p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Rate
            </h5>
            <p className="text-gray-800">5</p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Amount
            </h5>
            <p className="sm:text-end text-gray-800">$500</p>
          </div>
        </div>

        <div className="sm:hidden border-b border-gray-200"></div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          <div className="col-span-full sm:col-span-2">
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Item
            </h5>
            <p className="font-medium text-gray-800">Web project</p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Qty
            </h5>
            <p className="text-gray-800">1</p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Rate
            </h5>
            <p className="text-gray-800">24</p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Amount
            </h5>
            <p className="sm:text-end text-gray-800">$1250</p>
          </div>
        </div>

        <div className="sm:hidden border-b border-gray-200"></div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          <div className="col-span-full sm:col-span-2">
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Item
            </h5>
            <p className="font-medium text-gray-800">SEO</p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Qty
            </h5>
            <p className="text-gray-800">1</p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Rate
            </h5>
            <p className="text-gray-800">6</p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Amount
            </h5>
            <p className="sm:text-end text-gray-800">$2000</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex sm:justify-end">
        <div className="w-full max-w-2xl sm:text-end space-y-2">
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500">Subotal:</dt>
              <dd className="col-span-2 font-medium text-gray-800">$2750.00</dd>
            </dl>

            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500">Total:</dt>
              <dd className="col-span-2 font-medium text-gray-800">$2750.00</dd>
            </dl>

            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500">Tax:</dt>
              <dd className="col-span-2 font-medium text-gray-800">$39.00</dd>
            </dl>

            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500">Amount paid:</dt>
              <dd className="col-span-2 font-medium text-gray-800">$2789.00</dd>
            </dl>

            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500">Due balance:</dt>
              <dd className="col-span-2 font-medium text-gray-800">$0.00</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
