import { greeting } from '../src';

test('greeting', () => expect(greeting('Viktor')).toBe('Hello Viktor'));
