export const TEMPLATE_ONE = `<html lang='en'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Invoice {{invoiceNumber}}</title>
    <link
      href='https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'
      rel='stylesheet'
    />
  </head>
  <body>
    <div
      class='relative flex flex-1 gap-5 flex-col min-h-full w-full px-8 pt-10 pb-8 text-left bg-white shadow-md'
    >
      {{! header component }}
      {{#if header}}
        <header class='flex text-justify text-sm text-gray-500'>
          {{header}}
        </header>
      {{/if}}

      <div class='flex justify-between'>
        <div>
          <h1 class='text-lg font-bold'>Invoice</h1>
          <p class='text-gray-500'>Invoice Number: {{invoiceNumber}}</p>
          <p class='text-gray-500'>Date: {{date}}</p>
        </div>
        <div>
          <p class='text-gray-500 text-right font-semibold text-xl'>
            {{companyName}}
          </p>
          {{! logo umg }}
          {{#if imgUrl}}
            <div class='h-20 w-full flex justify-center items-center'>
              <img
                src='{{{imgUrl}}}'
                alt='{{companyName}}'
                class='h-full w-full object-contain'
              />
            </div>
          {{/if}}
        </div>
      </div>

      <div class='flex flex-col gap-1'>
        <h2 class='text-lg font-semibold'>Bill To:</h2>
        {{#if billToName}}
          <p class='text-gray-500'>{{billToName}}</p>
        {{/if}}
        {{#if billToEmail}}
          <p class='text-gray-500'>{{billToEmail}}</p>
        {{/if}}
        {{#if billToPhone}}
          <p class='text-gray-500'>{{billToPhone}}</p>
        {{/if}}
        {{#if billToAddress}}
          <p class='text-gray-500'>{{billToAddress}}</p>
        {{/if}}
        {{#if billToAddressLine1}}
          <p class='text-gray-500'>{{billToAddressLine1}}</p>
        {{/if}}
        {{#if billToAddressLine2}}
          <p class='text-gray-500'>{{billToAddressLine2}}</p>
        {{/if}}
        {{#if billToCity}}
          <p class='text-gray-500'>{{billToCity}}</p>
        {{/if}}
        {{#if billToState}}
          <p class='text-gray-500'>{{billToState}}</p>
        {{/if}}
        {{#if billToCountry}}
          <p class='text-gray-500'>{{billToCountry}}</p>
        {{/if}}
        {{#if billToPostalCode}}
          <p class='text-gray-500'>{{billToPostalCode}}</p>
        {{/if}}
        <!-- Line items section -->
        {{#if customFields}}
          {{#each customFields}}
            <p class='text-gray-500'>{{value}}</p>
          {{/each}}
        {{/if}}
      </div>

      {{! memo }}
      {{#if memo}}
        <section class='flex text-justify text-sm text-gray-500'>
          {{memo}}
        </section>
      {{/if}}

      <section class='flex-1 mt-5 w-full pdf-printable-content'>
        <table class='w-full mb-6'>
          <thead class='border-b border-gray-300 text-sm text-nowrap'>
            <tr>
              <th class='text-left py-2 px-4 w-1/2'>Description</th>
              <th class='text-left py-2 px-4'>Quantity</th>
              <th class='text-left py-2 px-4'>Unit Price</th>
              <th class='text-left py-2 px-4'>Amount</th>
            </tr>
          </thead>
          <tbody class='text-sm'>
            <!-- Line items section -->
            {{#each items}}
              <tr>
                <td class='py-2 px-4 w-1/2'>{{description}}</td>
                <td class='py-2 px-4'>{{quantity}}</td>
                <td class='py-2 px-4'>{{units}}</td>
                <td class='py-2 px-4'>{{amount}}</td>
              </tr>
            {{/each}}
          </tbody>
        </table>
      </section>

      <section class='flex flex-col gap-10 border-t pt-5'>
        <div class='flex flex-row gap-10'>
          <div class='flex flex-1 justify-end'>
            {{#if dueDate}}
              <p class='text-sm text-gray-500'>
                Payment Due By:
                {{dueDate}}
              </p>
            {{/if}}
          </div>

          <div class='flex flex-col gap-2 text-sm text-gray-500 text-right'>
            <p>Subtotal: {{subtotal}}</p>
            {{#if tax}}
              <p>Tax: {{tax}}</p>
            {{/if}}
            <h2 class='text-gray-800'>Total: {{total}}</h2>
          </div>
        </div>
      </section>

      {{#if footer}}
        <footer class='flex text-justify text-sm text-gray-500 mt-auto'>
          {{footer}}
        </footer>
      {{/if}}
    </div>
  </body>
</html>`;
