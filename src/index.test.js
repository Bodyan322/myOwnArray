import MyArray from './index';

describe('Class MyArray', () => {

  describe('tests for method map', () => {
// 8
    test('if custom context doesn\'t provided, use current context', () => {
      const arr = new MyArray(1,4,0);
      const testArr = [];
      const user = {
        name: 'ivan',
        testForEach () {
          arr.forEach(() => testArr.push(this.name));
        }
      }
      user.testForEach()
      expect(testArr.toString()).toBe('ivan,ivan,ivan');
    });
// 1
    test('instance has method map', () => {
      const arr = new MyArray(1,4,0);
      expect(arr.map).toBeInstanceOf(Function);
    });
// 2
    test('instance has not Own Property map', () => {
      const arr = new MyArray(1,4,0);
      expect(arr.hasOwnProperty('map')).toBeFalsy();
    });
// 4
    test('Method map must return an Array', () => {
      const arr = new MyArray(1,4,0);
      expect(arr.map((num) => num + 5).toBeInstanceOf(Array);
    });

  });


});


//map