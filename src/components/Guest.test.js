import React from 'react';
import renderer from 'react-test-renderer';
import Guest from './Guest';
import guests from '../data/guests.json';

test('Guest snapshot test', () => {
  const metadata = guests["meta-data"];
  const data = guests.data[0];
  const component = renderer.create(<Guest blueprint={metadata} data={data} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});