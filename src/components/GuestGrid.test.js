import React from 'react';
import renderer from 'react-test-renderer';
import GuestGrid from './GuestGrid';
import guests from '../data/guests.json';

test('Guest snapshot test', () => {
  const metadata = guests["meta-data"];
  const data = guests.data;
  const component = renderer.create(<GuestGrid blueprint={metadata} data={data} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});