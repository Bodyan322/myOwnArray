import MyArray from '../index.js';

describe('tests for constructor', () => {
  test('should correct work with 0,1,2 ... n arguments(create 3 instance and check length and content)', () => {
    const arr1 = new MyArray();
    const arr2 = new MyArray(5);
    const arr3 = new MyArray(1, 2);
    const arr4 = new MyArray('1');

    expect(arr1.length).toBe(0);
    expect(arr2.length).toBe(5);
    expect(arr3.length).toBe(2);
    expect(arr3[0]).toBe(1);
    expect(arr3[1]).toBe(2);
    expect(arr4.length).toBe(1);
    expect(arr4[0]).toBe('1');
  });

  test('should have own property length', () => {
    const arr = new MyArray();

    expect(Object.prototype.hasOwnProperty.call(arr, 'length')).toBeTruthy();
  });

  test('should has a constructor in MyArray ', () => {
    expect(MyArray.prototype.constructor).toBe(MyArray);
  });
});

