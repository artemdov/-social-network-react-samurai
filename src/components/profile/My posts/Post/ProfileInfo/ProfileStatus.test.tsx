import React from 'react'
// @ts-ignore
import { create,ReactTestInstance } from 'react-test-renderer'
import ProfileStatus from './ProfileStatus';

describe("ProfileStatus component", () => {
    test("props status should be correct ", () => {
        const component = create(<ProfileStatus status='Hello' updateStatus={() => { }} />,);
        const instance = component.getInstance();
        if (instance) {
            expect(instance.props.status).toBe("Hello");
        }

    });

    test("after creation span shoud be displayed", () => {
        const component = create(<ProfileStatus status='Hello' updateStatus={() => { }} />,);
        const root = component.root;
        if (root) {
            let span = root.findByType('span');
            expect(span).not.toBeNull();
        }

    });

    test("after creation <input> shoudn't be displayed", () => {
        const component = create(<ProfileStatus status='Hello' updateStatus={() => { }} />,);
        const root = component.root;
        if (root) {
            expect(() => {
                let input = root.findByType('input');
            }).toThrow();
        }

    });

    test("after creation span shoud contains correct status", () => {
        const component = create(<ProfileStatus status='Hello' updateStatus={() => { }} />,);
        const root = component.root;
        if (root) {
            let span = root.findByType('span');
            expect(span.children[0]).toEqual('Hello');
        }

    });

    test("after  click on span input should be displayed", () => {
        const component = create(<ProfileStatus status='Hello' updateStatus={() => { }} />,);
        const root = component.root;
        if (root) {
            let span = root.findByType('span');
            span.props.onClick();
            let input = root.findByType('input');
            expect(input).not.toBeNull();
            expect(input.props.value).toBe('Hello');
        }

    });

    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status='Hello' updateStatus={mockCallback} />,);
        const instance  = component.getInstance() as (ReactTestInstance & {deActivateEditMode: () => void} | null) ;
        if (instance) {
            instance.deActivateEditMode();
            expect(mockCallback.mock.calls.length).toBe(1);
        }

    });
});