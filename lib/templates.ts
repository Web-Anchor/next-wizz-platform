import { Template } from '@appTypes/index';
import Handlebars from 'handlebars';

export function generateTemplate(props: {
  data: Template;
  template: string;
}): string {
  const template = Handlebars.compile(props.template);
  console.log('🚧 _body', props.data);

  return template(props.data);
}
