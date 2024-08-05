export type Prettify<T> = { [K in keyof T]: T[K] } & {}

type ComplexType = {
  a: string
  b: number
} & {
  c: boolean
  d: Date
}

//mejora la lectura
type PrettyComplexType = Prettify<ComplexType>

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never

type TypeA = { a: number }
type TypeB = { b: string }
type Intersection = UnionToIntersection<TypeA | TypeB>

//mejora la lectura
type PrettyIntersection = Prettify<Intersection>

type User = {
  id: number
  name: string
}

type Permissions = {
  canRead: boolean
  canWrite: boolean
}

//mejora la lectura
type UserWithPermissions = User & Permissions
type PrettyUserWithPermissions = Prettify<UserWithPermissions>
