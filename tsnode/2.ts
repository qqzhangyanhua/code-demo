const getArray = <T>(times: number, val: T): T[] => {
  let result: T[] = [];
  return [];
};

const add = <T>(a: T): T => {
  return a;
};
add(1);
add("1");

function swap<T, K>(tuple: [T, K]): [K, T] {
  return [tuple[1], tuple[0]];
}

function mixin<T, K>(a: T, b: K): T & K {
  return { ...a, ...b };
}
mixin(1,2)
mixin({a:1},'2')


interface Lengthwise {
    length: number;
}
interface IVal {
    name: string;
    age: number;
}
interface IVal2 {
    name: string;
    age?: number;
}
type IValLength = Lengthwise & IVal;  // 交叉类型
const valLength: IValLength = { name: '1', age: 1, length: 1 };

type IValLength2 = Lengthwise | IVal;  // 联合类型
const valLength2: IValLength2 = { name: '1',  length: 1 };

type PartialP = Partial<IVal>;  // Partial<T> 使所有属性变为可选
const partialP: PartialP = {   age: 1};

type RequiredP = Required<IVal2>;  // Required<T> 使所有属性变为必选
const requiredP: RequiredP = { name: '1', age: 1};


type OmitP = Omit<IVal, 'age'>;  // Omit<T, K> 使某个属性变为可选
const omitP: OmitP = { name: '1'};

type PickP = Pick<IVal, 'age'|'name'>;  // Pick<T, K> 使某个属性变为必选
const pickP: PickP = { age: 1,name:'22'};

type ExcludeP = Exclude<string|number, string>;  // Exclude<T, U> 从T中排除U
const excludeP: ExcludeP = 1;

type ExtractP = Extract<string|number, string>;  // Extract<T, U> 从T中提取U
const extractP: ExtractP = '1';

type NonNullableP = NonNullable<string|null|undefined>;  // NonNullable<T> 从T中排除null和undefined
const nonNullableP: NonNullableP = '1';

type ReturnTypeP = ReturnType<()=>string>;  // ReturnType<T> 获取函数返回值类型
const returnTypeP: ReturnTypeP = '1';

type InstanceTypeP = InstanceType<typeof String>;  // InstanceType<T> 获取构造函数类型的实例类型
const instanceTypeP: InstanceTypeP = '1';

type ParametersP = Parameters<()=>string>;  // Parameters<T> 获取函数参数类型
const parametersP: ParametersP = [];

type ConstructorParametersP = ConstructorParameters<typeof String>;  // ConstructorParameters<T> 获取构造函数参数类型
const constructorParametersP: ConstructorParametersP = [];

let person: Record<string, any> = { name: 'zf', age: 11 };
