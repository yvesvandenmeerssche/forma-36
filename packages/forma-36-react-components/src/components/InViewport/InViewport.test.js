import React from 'react';
import { mount } from 'enzyme';
import { axe } from 'jest-axe';
import InViewport from './InViewport';
import TextLink from '../TextLink';

it('renders the component', () => {
  const output = mount(
    <InViewport>
      <TextLink>Some Link</TextLink>
    </InViewport>,
  );

  expect(output).toMatchSnapshot();
});

it('renders the component with an additional class name', () => {
  const output = mount(
    <InViewport extraClassNames="my-extra-class">
      <TextLink>Some Link</TextLink>
    </InViewport>,
  );

  expect(output).toMatchSnapshot();
});

it('dispatches onOverflowTop', () => {
  const onOverflowTopMock = jest.fn();
  const output = mount(
    <InViewport
      extraClassNames="my-extra-class"
      onOverflowTop={onOverflowTopMock}
    >
      <TextLink>Some Link</TextLink>
    </InViewport>,
  );

  output.instance().nodeRef = {
    getBoundingClientRect: () => ({
      width: 10,
      height: 10,
      top: -100,
      left: 0,
      right: 10,
      bottom: 10,
    }),
  };
  output.instance().getDomPosition();
  expect(onOverflowTopMock).toHaveBeenCalled();
});

it('dispatches onOverflowTop', () => {
  const onOverflowLeftMock = jest.fn();
  const output = mount(
    <InViewport
      extraClassNames="my-extra-class"
      onOverflowLeft={onOverflowLeftMock}
    >
      <TextLink>Some Link</TextLink>
    </InViewport>,
  );

  output.instance().nodeRef = {
    getBoundingClientRect: () => ({
      width: 10,
      height: 10,
      top: 100,
      left: -100,
      right: 10,
      bottom: 10,
    }),
  };
  output.instance().getDomPosition();
  expect(onOverflowLeftMock).toHaveBeenCalled();
});

it('dispatches onOverflowRight', () => {
  const onOverflowRightMock = jest.fn();
  global.innerWidth = 80;
  const output = mount(
    <InViewport
      extraClassNames="my-extra-class"
      onOverflowRight={onOverflowRightMock}
    >
      <TextLink>Some Link</TextLink>
    </InViewport>,
  );

  output.instance().nodeRef = {
    getBoundingClientRect: () => ({
      width: 10,
      height: 10,
      top: 100,
      left: 100,
      right: 100,
      bottom: 10,
    }),
  };
  output.instance().getDomPosition();
  expect(onOverflowRightMock).toHaveBeenCalled();
});

it('dispatches onOverflowBottom', () => {
  const onOverflowBottomMock = jest.fn();
  global.innerWidth = 110;
  global.innerHeight = 100;
  const output = mount(
    <InViewport
      extraClassNames="my-extra-class"
      onOverflowBottom={onOverflowBottomMock}
    >
      <TextLink>Some Link</TextLink>
    </InViewport>,
  );

  output.instance().nodeRef = {
    getBoundingClientRect: () => ({
      width: 10,
      height: 10,
      top: 100,
      left: 100,
      right: 100,
      bottom: 120,
    }),
  };
  output.instance().getDomPosition();
  expect(onOverflowBottomMock).toHaveBeenCalled();
});

it('does not dispatch onOverflowBottom', () => {
  const onOverflowBottomMock = jest.fn();
  global.innerWidth = 110;
  global.innerHeight = 100;
  const output = mount(
    <InViewport
      extraClassNames="my-extra-class"
      onOverflowBottom={onOverflowBottomMock}
    >
      <TextLink>Some Link</TextLink>
    </InViewport>,
  );

  output.instance().nodeRef = {
    getBoundingClientRect: () => ({
      width: 10,
      height: 10,
      top: 100,
      left: 100,
      right: 100,
      bottom: 80,
    }),
  };
  output.instance().getDomPosition();
  expect(onOverflowBottomMock).not.toHaveBeenCalled();
});

it('has no a11y issues', async () => {
  const output = mount(
    <InViewport>
      <TextLink>Some Link</TextLink>
    </InViewport>,
  ).html();
  const results = await axe(output);

  expect(results).toHaveNoViolations();
});
