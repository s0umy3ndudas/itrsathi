
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Assessee
 * 
 */
export type Assessee = $Result.DefaultSelection<Prisma.$AssesseePayload>
/**
 * Model EProceeding
 * 
 */
export type EProceeding = $Result.DefaultSelection<Prisma.$EProceedingPayload>
/**
 * Model Notice
 * 
 */
export type Notice = $Result.DefaultSelection<Prisma.$NoticePayload>
/**
 * Model Response
 * 
 */
export type Response = $Result.DefaultSelection<Prisma.$ResponsePayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Assessees
 * const assessees = await prisma.assessee.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Assessees
   * const assessees = await prisma.assessee.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.assessee`: Exposes CRUD operations for the **Assessee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assessees
    * const assessees = await prisma.assessee.findMany()
    * ```
    */
  get assessee(): Prisma.AssesseeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eProceeding`: Exposes CRUD operations for the **EProceeding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EProceedings
    * const eProceedings = await prisma.eProceeding.findMany()
    * ```
    */
  get eProceeding(): Prisma.EProceedingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notice`: Exposes CRUD operations for the **Notice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notices
    * const notices = await prisma.notice.findMany()
    * ```
    */
  get notice(): Prisma.NoticeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.response`: Exposes CRUD operations for the **Response** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Responses
    * const responses = await prisma.response.findMany()
    * ```
    */
  get response(): Prisma.ResponseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Assessee: 'Assessee',
    EProceeding: 'EProceeding',
    Notice: 'Notice',
    Response: 'Response',
    Document: 'Document'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "assessee" | "eProceeding" | "notice" | "response" | "document"
      txIsolationLevel: never
    }
    model: {
      Assessee: {
        payload: Prisma.$AssesseePayload<ExtArgs>
        fields: Prisma.AssesseeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssesseeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssesseePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssesseeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssesseePayload>
          }
          findFirst: {
            args: Prisma.AssesseeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssesseePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssesseeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssesseePayload>
          }
          findMany: {
            args: Prisma.AssesseeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssesseePayload>[]
          }
          create: {
            args: Prisma.AssesseeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssesseePayload>
          }
          createMany: {
            args: Prisma.AssesseeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AssesseeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssesseePayload>
          }
          update: {
            args: Prisma.AssesseeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssesseePayload>
          }
          deleteMany: {
            args: Prisma.AssesseeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssesseeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AssesseeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssesseePayload>
          }
          aggregate: {
            args: Prisma.AssesseeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssessee>
          }
          groupBy: {
            args: Prisma.AssesseeGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssesseeGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.AssesseeFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.AssesseeAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.AssesseeCountArgs<ExtArgs>
            result: $Utils.Optional<AssesseeCountAggregateOutputType> | number
          }
        }
      }
      EProceeding: {
        payload: Prisma.$EProceedingPayload<ExtArgs>
        fields: Prisma.EProceedingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EProceedingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EProceedingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EProceedingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EProceedingPayload>
          }
          findFirst: {
            args: Prisma.EProceedingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EProceedingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EProceedingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EProceedingPayload>
          }
          findMany: {
            args: Prisma.EProceedingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EProceedingPayload>[]
          }
          create: {
            args: Prisma.EProceedingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EProceedingPayload>
          }
          createMany: {
            args: Prisma.EProceedingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EProceedingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EProceedingPayload>
          }
          update: {
            args: Prisma.EProceedingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EProceedingPayload>
          }
          deleteMany: {
            args: Prisma.EProceedingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EProceedingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EProceedingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EProceedingPayload>
          }
          aggregate: {
            args: Prisma.EProceedingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEProceeding>
          }
          groupBy: {
            args: Prisma.EProceedingGroupByArgs<ExtArgs>
            result: $Utils.Optional<EProceedingGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.EProceedingFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.EProceedingAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.EProceedingCountArgs<ExtArgs>
            result: $Utils.Optional<EProceedingCountAggregateOutputType> | number
          }
        }
      }
      Notice: {
        payload: Prisma.$NoticePayload<ExtArgs>
        fields: Prisma.NoticeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NoticeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NoticeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          findFirst: {
            args: Prisma.NoticeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NoticeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          findMany: {
            args: Prisma.NoticeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>[]
          }
          create: {
            args: Prisma.NoticeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          createMany: {
            args: Prisma.NoticeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.NoticeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          update: {
            args: Prisma.NoticeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          deleteMany: {
            args: Prisma.NoticeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NoticeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NoticeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          aggregate: {
            args: Prisma.NoticeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotice>
          }
          groupBy: {
            args: Prisma.NoticeGroupByArgs<ExtArgs>
            result: $Utils.Optional<NoticeGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.NoticeFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.NoticeAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.NoticeCountArgs<ExtArgs>
            result: $Utils.Optional<NoticeCountAggregateOutputType> | number
          }
        }
      }
      Response: {
        payload: Prisma.$ResponsePayload<ExtArgs>
        fields: Prisma.ResponseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResponseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResponseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          findFirst: {
            args: Prisma.ResponseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResponseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          findMany: {
            args: Prisma.ResponseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>[]
          }
          create: {
            args: Prisma.ResponseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          createMany: {
            args: Prisma.ResponseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ResponseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          update: {
            args: Prisma.ResponseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          deleteMany: {
            args: Prisma.ResponseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResponseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ResponseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          aggregate: {
            args: Prisma.ResponseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResponse>
          }
          groupBy: {
            args: Prisma.ResponseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResponseGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ResponseFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ResponseAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ResponseCountArgs<ExtArgs>
            result: $Utils.Optional<ResponseCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.DocumentFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.DocumentAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    assessee?: AssesseeOmit
    eProceeding?: EProceedingOmit
    notice?: NoticeOmit
    response?: ResponseOmit
    document?: DocumentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AssesseeCountOutputType
   */

  export type AssesseeCountOutputType = {
    eproceedings: number
  }

  export type AssesseeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eproceedings?: boolean | AssesseeCountOutputTypeCountEproceedingsArgs
  }

  // Custom InputTypes
  /**
   * AssesseeCountOutputType without action
   */
  export type AssesseeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssesseeCountOutputType
     */
    select?: AssesseeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AssesseeCountOutputType without action
   */
  export type AssesseeCountOutputTypeCountEproceedingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EProceedingWhereInput
  }


  /**
   * Count Type EProceedingCountOutputType
   */

  export type EProceedingCountOutputType = {
    notices: number
  }

  export type EProceedingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notices?: boolean | EProceedingCountOutputTypeCountNoticesArgs
  }

  // Custom InputTypes
  /**
   * EProceedingCountOutputType without action
   */
  export type EProceedingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EProceedingCountOutputType
     */
    select?: EProceedingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EProceedingCountOutputType without action
   */
  export type EProceedingCountOutputTypeCountNoticesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoticeWhereInput
  }


  /**
   * Count Type NoticeCountOutputType
   */

  export type NoticeCountOutputType = {
    responses: number
    documents: number
  }

  export type NoticeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    responses?: boolean | NoticeCountOutputTypeCountResponsesArgs
    documents?: boolean | NoticeCountOutputTypeCountDocumentsArgs
  }

  // Custom InputTypes
  /**
   * NoticeCountOutputType without action
   */
  export type NoticeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoticeCountOutputType
     */
    select?: NoticeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NoticeCountOutputType without action
   */
  export type NoticeCountOutputTypeCountResponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResponseWhereInput
  }

  /**
   * NoticeCountOutputType without action
   */
  export type NoticeCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }


  /**
   * Count Type ResponseCountOutputType
   */

  export type ResponseCountOutputType = {
    documents: number
  }

  export type ResponseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | ResponseCountOutputTypeCountDocumentsArgs
  }

  // Custom InputTypes
  /**
   * ResponseCountOutputType without action
   */
  export type ResponseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResponseCountOutputType
     */
    select?: ResponseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ResponseCountOutputType without action
   */
  export type ResponseCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Assessee
   */

  export type AggregateAssessee = {
    _count: AssesseeCountAggregateOutputType | null
    _min: AssesseeMinAggregateOutputType | null
    _max: AssesseeMaxAggregateOutputType | null
  }

  export type AssesseeMinAggregateOutputType = {
    id: string | null
    pan: string | null
    name: string | null
    lastSyncedOn: Date | null
  }

  export type AssesseeMaxAggregateOutputType = {
    id: string | null
    pan: string | null
    name: string | null
    lastSyncedOn: Date | null
  }

  export type AssesseeCountAggregateOutputType = {
    id: number
    pan: number
    name: number
    lastSyncedOn: number
    _all: number
  }


  export type AssesseeMinAggregateInputType = {
    id?: true
    pan?: true
    name?: true
    lastSyncedOn?: true
  }

  export type AssesseeMaxAggregateInputType = {
    id?: true
    pan?: true
    name?: true
    lastSyncedOn?: true
  }

  export type AssesseeCountAggregateInputType = {
    id?: true
    pan?: true
    name?: true
    lastSyncedOn?: true
    _all?: true
  }

  export type AssesseeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assessee to aggregate.
     */
    where?: AssesseeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessees to fetch.
     */
    orderBy?: AssesseeOrderByWithRelationInput | AssesseeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssesseeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assessees
    **/
    _count?: true | AssesseeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssesseeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssesseeMaxAggregateInputType
  }

  export type GetAssesseeAggregateType<T extends AssesseeAggregateArgs> = {
        [P in keyof T & keyof AggregateAssessee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssessee[P]>
      : GetScalarType<T[P], AggregateAssessee[P]>
  }




  export type AssesseeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssesseeWhereInput
    orderBy?: AssesseeOrderByWithAggregationInput | AssesseeOrderByWithAggregationInput[]
    by: AssesseeScalarFieldEnum[] | AssesseeScalarFieldEnum
    having?: AssesseeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssesseeCountAggregateInputType | true
    _min?: AssesseeMinAggregateInputType
    _max?: AssesseeMaxAggregateInputType
  }

  export type AssesseeGroupByOutputType = {
    id: string
    pan: string
    name: string | null
    lastSyncedOn: Date | null
    _count: AssesseeCountAggregateOutputType | null
    _min: AssesseeMinAggregateOutputType | null
    _max: AssesseeMaxAggregateOutputType | null
  }

  type GetAssesseeGroupByPayload<T extends AssesseeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssesseeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssesseeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssesseeGroupByOutputType[P]>
            : GetScalarType<T[P], AssesseeGroupByOutputType[P]>
        }
      >
    >


  export type AssesseeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pan?: boolean
    name?: boolean
    lastSyncedOn?: boolean
    eproceedings?: boolean | Assessee$eproceedingsArgs<ExtArgs>
    _count?: boolean | AssesseeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessee"]>



  export type AssesseeSelectScalar = {
    id?: boolean
    pan?: boolean
    name?: boolean
    lastSyncedOn?: boolean
  }

  export type AssesseeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pan" | "name" | "lastSyncedOn", ExtArgs["result"]["assessee"]>
  export type AssesseeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eproceedings?: boolean | Assessee$eproceedingsArgs<ExtArgs>
    _count?: boolean | AssesseeCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AssesseePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Assessee"
    objects: {
      eproceedings: Prisma.$EProceedingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      pan: string
      name: string | null
      lastSyncedOn: Date | null
    }, ExtArgs["result"]["assessee"]>
    composites: {}
  }

  type AssesseeGetPayload<S extends boolean | null | undefined | AssesseeDefaultArgs> = $Result.GetResult<Prisma.$AssesseePayload, S>

  type AssesseeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssesseeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssesseeCountAggregateInputType | true
    }

  export interface AssesseeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Assessee'], meta: { name: 'Assessee' } }
    /**
     * Find zero or one Assessee that matches the filter.
     * @param {AssesseeFindUniqueArgs} args - Arguments to find a Assessee
     * @example
     * // Get one Assessee
     * const assessee = await prisma.assessee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssesseeFindUniqueArgs>(args: SelectSubset<T, AssesseeFindUniqueArgs<ExtArgs>>): Prisma__AssesseeClient<$Result.GetResult<Prisma.$AssesseePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Assessee that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssesseeFindUniqueOrThrowArgs} args - Arguments to find a Assessee
     * @example
     * // Get one Assessee
     * const assessee = await prisma.assessee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssesseeFindUniqueOrThrowArgs>(args: SelectSubset<T, AssesseeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssesseeClient<$Result.GetResult<Prisma.$AssesseePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assessee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssesseeFindFirstArgs} args - Arguments to find a Assessee
     * @example
     * // Get one Assessee
     * const assessee = await prisma.assessee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssesseeFindFirstArgs>(args?: SelectSubset<T, AssesseeFindFirstArgs<ExtArgs>>): Prisma__AssesseeClient<$Result.GetResult<Prisma.$AssesseePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assessee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssesseeFindFirstOrThrowArgs} args - Arguments to find a Assessee
     * @example
     * // Get one Assessee
     * const assessee = await prisma.assessee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssesseeFindFirstOrThrowArgs>(args?: SelectSubset<T, AssesseeFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssesseeClient<$Result.GetResult<Prisma.$AssesseePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assessees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssesseeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assessees
     * const assessees = await prisma.assessee.findMany()
     * 
     * // Get first 10 Assessees
     * const assessees = await prisma.assessee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assesseeWithIdOnly = await prisma.assessee.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssesseeFindManyArgs>(args?: SelectSubset<T, AssesseeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssesseePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Assessee.
     * @param {AssesseeCreateArgs} args - Arguments to create a Assessee.
     * @example
     * // Create one Assessee
     * const Assessee = await prisma.assessee.create({
     *   data: {
     *     // ... data to create a Assessee
     *   }
     * })
     * 
     */
    create<T extends AssesseeCreateArgs>(args: SelectSubset<T, AssesseeCreateArgs<ExtArgs>>): Prisma__AssesseeClient<$Result.GetResult<Prisma.$AssesseePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Assessees.
     * @param {AssesseeCreateManyArgs} args - Arguments to create many Assessees.
     * @example
     * // Create many Assessees
     * const assessee = await prisma.assessee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssesseeCreateManyArgs>(args?: SelectSubset<T, AssesseeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Assessee.
     * @param {AssesseeDeleteArgs} args - Arguments to delete one Assessee.
     * @example
     * // Delete one Assessee
     * const Assessee = await prisma.assessee.delete({
     *   where: {
     *     // ... filter to delete one Assessee
     *   }
     * })
     * 
     */
    delete<T extends AssesseeDeleteArgs>(args: SelectSubset<T, AssesseeDeleteArgs<ExtArgs>>): Prisma__AssesseeClient<$Result.GetResult<Prisma.$AssesseePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Assessee.
     * @param {AssesseeUpdateArgs} args - Arguments to update one Assessee.
     * @example
     * // Update one Assessee
     * const assessee = await prisma.assessee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssesseeUpdateArgs>(args: SelectSubset<T, AssesseeUpdateArgs<ExtArgs>>): Prisma__AssesseeClient<$Result.GetResult<Prisma.$AssesseePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Assessees.
     * @param {AssesseeDeleteManyArgs} args - Arguments to filter Assessees to delete.
     * @example
     * // Delete a few Assessees
     * const { count } = await prisma.assessee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssesseeDeleteManyArgs>(args?: SelectSubset<T, AssesseeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assessees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssesseeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assessees
     * const assessee = await prisma.assessee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssesseeUpdateManyArgs>(args: SelectSubset<T, AssesseeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Assessee.
     * @param {AssesseeUpsertArgs} args - Arguments to update or create a Assessee.
     * @example
     * // Update or create a Assessee
     * const assessee = await prisma.assessee.upsert({
     *   create: {
     *     // ... data to create a Assessee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assessee we want to update
     *   }
     * })
     */
    upsert<T extends AssesseeUpsertArgs>(args: SelectSubset<T, AssesseeUpsertArgs<ExtArgs>>): Prisma__AssesseeClient<$Result.GetResult<Prisma.$AssesseePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assessees that matches the filter.
     * @param {AssesseeFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const assessee = await prisma.assessee.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: AssesseeFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Assessee.
     * @param {AssesseeAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const assessee = await prisma.assessee.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: AssesseeAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Assessees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssesseeCountArgs} args - Arguments to filter Assessees to count.
     * @example
     * // Count the number of Assessees
     * const count = await prisma.assessee.count({
     *   where: {
     *     // ... the filter for the Assessees we want to count
     *   }
     * })
    **/
    count<T extends AssesseeCountArgs>(
      args?: Subset<T, AssesseeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssesseeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assessee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssesseeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssesseeAggregateArgs>(args: Subset<T, AssesseeAggregateArgs>): Prisma.PrismaPromise<GetAssesseeAggregateType<T>>

    /**
     * Group by Assessee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssesseeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssesseeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssesseeGroupByArgs['orderBy'] }
        : { orderBy?: AssesseeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssesseeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssesseeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Assessee model
   */
  readonly fields: AssesseeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Assessee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssesseeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    eproceedings<T extends Assessee$eproceedingsArgs<ExtArgs> = {}>(args?: Subset<T, Assessee$eproceedingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EProceedingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Assessee model
   */
  interface AssesseeFieldRefs {
    readonly id: FieldRef<"Assessee", 'String'>
    readonly pan: FieldRef<"Assessee", 'String'>
    readonly name: FieldRef<"Assessee", 'String'>
    readonly lastSyncedOn: FieldRef<"Assessee", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Assessee findUnique
   */
  export type AssesseeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessee
     */
    select?: AssesseeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessee
     */
    omit?: AssesseeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssesseeInclude<ExtArgs> | null
    /**
     * Filter, which Assessee to fetch.
     */
    where: AssesseeWhereUniqueInput
  }

  /**
   * Assessee findUniqueOrThrow
   */
  export type AssesseeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessee
     */
    select?: AssesseeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessee
     */
    omit?: AssesseeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssesseeInclude<ExtArgs> | null
    /**
     * Filter, which Assessee to fetch.
     */
    where: AssesseeWhereUniqueInput
  }

  /**
   * Assessee findFirst
   */
  export type AssesseeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessee
     */
    select?: AssesseeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessee
     */
    omit?: AssesseeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssesseeInclude<ExtArgs> | null
    /**
     * Filter, which Assessee to fetch.
     */
    where?: AssesseeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessees to fetch.
     */
    orderBy?: AssesseeOrderByWithRelationInput | AssesseeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assessees.
     */
    cursor?: AssesseeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assessees.
     */
    distinct?: AssesseeScalarFieldEnum | AssesseeScalarFieldEnum[]
  }

  /**
   * Assessee findFirstOrThrow
   */
  export type AssesseeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessee
     */
    select?: AssesseeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessee
     */
    omit?: AssesseeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssesseeInclude<ExtArgs> | null
    /**
     * Filter, which Assessee to fetch.
     */
    where?: AssesseeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessees to fetch.
     */
    orderBy?: AssesseeOrderByWithRelationInput | AssesseeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assessees.
     */
    cursor?: AssesseeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assessees.
     */
    distinct?: AssesseeScalarFieldEnum | AssesseeScalarFieldEnum[]
  }

  /**
   * Assessee findMany
   */
  export type AssesseeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessee
     */
    select?: AssesseeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessee
     */
    omit?: AssesseeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssesseeInclude<ExtArgs> | null
    /**
     * Filter, which Assessees to fetch.
     */
    where?: AssesseeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessees to fetch.
     */
    orderBy?: AssesseeOrderByWithRelationInput | AssesseeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assessees.
     */
    cursor?: AssesseeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessees.
     */
    skip?: number
    distinct?: AssesseeScalarFieldEnum | AssesseeScalarFieldEnum[]
  }

  /**
   * Assessee create
   */
  export type AssesseeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessee
     */
    select?: AssesseeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessee
     */
    omit?: AssesseeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssesseeInclude<ExtArgs> | null
    /**
     * The data needed to create a Assessee.
     */
    data: XOR<AssesseeCreateInput, AssesseeUncheckedCreateInput>
  }

  /**
   * Assessee createMany
   */
  export type AssesseeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assessees.
     */
    data: AssesseeCreateManyInput | AssesseeCreateManyInput[]
  }

  /**
   * Assessee update
   */
  export type AssesseeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessee
     */
    select?: AssesseeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessee
     */
    omit?: AssesseeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssesseeInclude<ExtArgs> | null
    /**
     * The data needed to update a Assessee.
     */
    data: XOR<AssesseeUpdateInput, AssesseeUncheckedUpdateInput>
    /**
     * Choose, which Assessee to update.
     */
    where: AssesseeWhereUniqueInput
  }

  /**
   * Assessee updateMany
   */
  export type AssesseeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assessees.
     */
    data: XOR<AssesseeUpdateManyMutationInput, AssesseeUncheckedUpdateManyInput>
    /**
     * Filter which Assessees to update
     */
    where?: AssesseeWhereInput
    /**
     * Limit how many Assessees to update.
     */
    limit?: number
  }

  /**
   * Assessee upsert
   */
  export type AssesseeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessee
     */
    select?: AssesseeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessee
     */
    omit?: AssesseeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssesseeInclude<ExtArgs> | null
    /**
     * The filter to search for the Assessee to update in case it exists.
     */
    where: AssesseeWhereUniqueInput
    /**
     * In case the Assessee found by the `where` argument doesn't exist, create a new Assessee with this data.
     */
    create: XOR<AssesseeCreateInput, AssesseeUncheckedCreateInput>
    /**
     * In case the Assessee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssesseeUpdateInput, AssesseeUncheckedUpdateInput>
  }

  /**
   * Assessee delete
   */
  export type AssesseeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessee
     */
    select?: AssesseeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessee
     */
    omit?: AssesseeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssesseeInclude<ExtArgs> | null
    /**
     * Filter which Assessee to delete.
     */
    where: AssesseeWhereUniqueInput
  }

  /**
   * Assessee deleteMany
   */
  export type AssesseeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assessees to delete
     */
    where?: AssesseeWhereInput
    /**
     * Limit how many Assessees to delete.
     */
    limit?: number
  }

  /**
   * Assessee findRaw
   */
  export type AssesseeFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Assessee aggregateRaw
   */
  export type AssesseeAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Assessee.eproceedings
   */
  export type Assessee$eproceedingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EProceeding
     */
    select?: EProceedingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EProceeding
     */
    omit?: EProceedingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EProceedingInclude<ExtArgs> | null
    where?: EProceedingWhereInput
    orderBy?: EProceedingOrderByWithRelationInput | EProceedingOrderByWithRelationInput[]
    cursor?: EProceedingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EProceedingScalarFieldEnum | EProceedingScalarFieldEnum[]
  }

  /**
   * Assessee without action
   */
  export type AssesseeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessee
     */
    select?: AssesseeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessee
     */
    omit?: AssesseeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssesseeInclude<ExtArgs> | null
  }


  /**
   * Model EProceeding
   */

  export type AggregateEProceeding = {
    _count: EProceedingCountAggregateOutputType | null
    _avg: EProceedingAvgAggregateOutputType | null
    _sum: EProceedingSumAggregateOutputType | null
    _min: EProceedingMinAggregateOutputType | null
    _max: EProceedingMaxAggregateOutputType | null
  }

  export type EProceedingAvgAggregateOutputType = {
    ay: number | null
  }

  export type EProceedingSumAggregateOutputType = {
    ay: number | null
  }

  export type EProceedingMinAggregateOutputType = {
    id: string | null
    type: string | null
    ay: number | null
    assesseeId: string | null
  }

  export type EProceedingMaxAggregateOutputType = {
    id: string | null
    type: string | null
    ay: number | null
    assesseeId: string | null
  }

  export type EProceedingCountAggregateOutputType = {
    id: number
    type: number
    ay: number
    assesseeId: number
    _all: number
  }


  export type EProceedingAvgAggregateInputType = {
    ay?: true
  }

  export type EProceedingSumAggregateInputType = {
    ay?: true
  }

  export type EProceedingMinAggregateInputType = {
    id?: true
    type?: true
    ay?: true
    assesseeId?: true
  }

  export type EProceedingMaxAggregateInputType = {
    id?: true
    type?: true
    ay?: true
    assesseeId?: true
  }

  export type EProceedingCountAggregateInputType = {
    id?: true
    type?: true
    ay?: true
    assesseeId?: true
    _all?: true
  }

  export type EProceedingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EProceeding to aggregate.
     */
    where?: EProceedingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EProceedings to fetch.
     */
    orderBy?: EProceedingOrderByWithRelationInput | EProceedingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EProceedingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EProceedings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EProceedings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EProceedings
    **/
    _count?: true | EProceedingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EProceedingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EProceedingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EProceedingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EProceedingMaxAggregateInputType
  }

  export type GetEProceedingAggregateType<T extends EProceedingAggregateArgs> = {
        [P in keyof T & keyof AggregateEProceeding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEProceeding[P]>
      : GetScalarType<T[P], AggregateEProceeding[P]>
  }




  export type EProceedingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EProceedingWhereInput
    orderBy?: EProceedingOrderByWithAggregationInput | EProceedingOrderByWithAggregationInput[]
    by: EProceedingScalarFieldEnum[] | EProceedingScalarFieldEnum
    having?: EProceedingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EProceedingCountAggregateInputType | true
    _avg?: EProceedingAvgAggregateInputType
    _sum?: EProceedingSumAggregateInputType
    _min?: EProceedingMinAggregateInputType
    _max?: EProceedingMaxAggregateInputType
  }

  export type EProceedingGroupByOutputType = {
    id: string
    type: string | null
    ay: number | null
    assesseeId: string
    _count: EProceedingCountAggregateOutputType | null
    _avg: EProceedingAvgAggregateOutputType | null
    _sum: EProceedingSumAggregateOutputType | null
    _min: EProceedingMinAggregateOutputType | null
    _max: EProceedingMaxAggregateOutputType | null
  }

  type GetEProceedingGroupByPayload<T extends EProceedingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EProceedingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EProceedingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EProceedingGroupByOutputType[P]>
            : GetScalarType<T[P], EProceedingGroupByOutputType[P]>
        }
      >
    >


  export type EProceedingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    ay?: boolean
    assesseeId?: boolean
    assessee?: boolean | AssesseeDefaultArgs<ExtArgs>
    notices?: boolean | EProceeding$noticesArgs<ExtArgs>
    _count?: boolean | EProceedingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eProceeding"]>



  export type EProceedingSelectScalar = {
    id?: boolean
    type?: boolean
    ay?: boolean
    assesseeId?: boolean
  }

  export type EProceedingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "ay" | "assesseeId", ExtArgs["result"]["eProceeding"]>
  export type EProceedingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessee?: boolean | AssesseeDefaultArgs<ExtArgs>
    notices?: boolean | EProceeding$noticesArgs<ExtArgs>
    _count?: boolean | EProceedingCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $EProceedingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EProceeding"
    objects: {
      assessee: Prisma.$AssesseePayload<ExtArgs>
      notices: Prisma.$NoticePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string | null
      ay: number | null
      assesseeId: string
    }, ExtArgs["result"]["eProceeding"]>
    composites: {}
  }

  type EProceedingGetPayload<S extends boolean | null | undefined | EProceedingDefaultArgs> = $Result.GetResult<Prisma.$EProceedingPayload, S>

  type EProceedingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EProceedingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EProceedingCountAggregateInputType | true
    }

  export interface EProceedingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EProceeding'], meta: { name: 'EProceeding' } }
    /**
     * Find zero or one EProceeding that matches the filter.
     * @param {EProceedingFindUniqueArgs} args - Arguments to find a EProceeding
     * @example
     * // Get one EProceeding
     * const eProceeding = await prisma.eProceeding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EProceedingFindUniqueArgs>(args: SelectSubset<T, EProceedingFindUniqueArgs<ExtArgs>>): Prisma__EProceedingClient<$Result.GetResult<Prisma.$EProceedingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EProceeding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EProceedingFindUniqueOrThrowArgs} args - Arguments to find a EProceeding
     * @example
     * // Get one EProceeding
     * const eProceeding = await prisma.eProceeding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EProceedingFindUniqueOrThrowArgs>(args: SelectSubset<T, EProceedingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EProceedingClient<$Result.GetResult<Prisma.$EProceedingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EProceeding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EProceedingFindFirstArgs} args - Arguments to find a EProceeding
     * @example
     * // Get one EProceeding
     * const eProceeding = await prisma.eProceeding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EProceedingFindFirstArgs>(args?: SelectSubset<T, EProceedingFindFirstArgs<ExtArgs>>): Prisma__EProceedingClient<$Result.GetResult<Prisma.$EProceedingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EProceeding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EProceedingFindFirstOrThrowArgs} args - Arguments to find a EProceeding
     * @example
     * // Get one EProceeding
     * const eProceeding = await prisma.eProceeding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EProceedingFindFirstOrThrowArgs>(args?: SelectSubset<T, EProceedingFindFirstOrThrowArgs<ExtArgs>>): Prisma__EProceedingClient<$Result.GetResult<Prisma.$EProceedingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EProceedings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EProceedingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EProceedings
     * const eProceedings = await prisma.eProceeding.findMany()
     * 
     * // Get first 10 EProceedings
     * const eProceedings = await prisma.eProceeding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eProceedingWithIdOnly = await prisma.eProceeding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EProceedingFindManyArgs>(args?: SelectSubset<T, EProceedingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EProceedingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EProceeding.
     * @param {EProceedingCreateArgs} args - Arguments to create a EProceeding.
     * @example
     * // Create one EProceeding
     * const EProceeding = await prisma.eProceeding.create({
     *   data: {
     *     // ... data to create a EProceeding
     *   }
     * })
     * 
     */
    create<T extends EProceedingCreateArgs>(args: SelectSubset<T, EProceedingCreateArgs<ExtArgs>>): Prisma__EProceedingClient<$Result.GetResult<Prisma.$EProceedingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EProceedings.
     * @param {EProceedingCreateManyArgs} args - Arguments to create many EProceedings.
     * @example
     * // Create many EProceedings
     * const eProceeding = await prisma.eProceeding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EProceedingCreateManyArgs>(args?: SelectSubset<T, EProceedingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EProceeding.
     * @param {EProceedingDeleteArgs} args - Arguments to delete one EProceeding.
     * @example
     * // Delete one EProceeding
     * const EProceeding = await prisma.eProceeding.delete({
     *   where: {
     *     // ... filter to delete one EProceeding
     *   }
     * })
     * 
     */
    delete<T extends EProceedingDeleteArgs>(args: SelectSubset<T, EProceedingDeleteArgs<ExtArgs>>): Prisma__EProceedingClient<$Result.GetResult<Prisma.$EProceedingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EProceeding.
     * @param {EProceedingUpdateArgs} args - Arguments to update one EProceeding.
     * @example
     * // Update one EProceeding
     * const eProceeding = await prisma.eProceeding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EProceedingUpdateArgs>(args: SelectSubset<T, EProceedingUpdateArgs<ExtArgs>>): Prisma__EProceedingClient<$Result.GetResult<Prisma.$EProceedingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EProceedings.
     * @param {EProceedingDeleteManyArgs} args - Arguments to filter EProceedings to delete.
     * @example
     * // Delete a few EProceedings
     * const { count } = await prisma.eProceeding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EProceedingDeleteManyArgs>(args?: SelectSubset<T, EProceedingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EProceedings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EProceedingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EProceedings
     * const eProceeding = await prisma.eProceeding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EProceedingUpdateManyArgs>(args: SelectSubset<T, EProceedingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EProceeding.
     * @param {EProceedingUpsertArgs} args - Arguments to update or create a EProceeding.
     * @example
     * // Update or create a EProceeding
     * const eProceeding = await prisma.eProceeding.upsert({
     *   create: {
     *     // ... data to create a EProceeding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EProceeding we want to update
     *   }
     * })
     */
    upsert<T extends EProceedingUpsertArgs>(args: SelectSubset<T, EProceedingUpsertArgs<ExtArgs>>): Prisma__EProceedingClient<$Result.GetResult<Prisma.$EProceedingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EProceedings that matches the filter.
     * @param {EProceedingFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const eProceeding = await prisma.eProceeding.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: EProceedingFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a EProceeding.
     * @param {EProceedingAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const eProceeding = await prisma.eProceeding.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: EProceedingAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of EProceedings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EProceedingCountArgs} args - Arguments to filter EProceedings to count.
     * @example
     * // Count the number of EProceedings
     * const count = await prisma.eProceeding.count({
     *   where: {
     *     // ... the filter for the EProceedings we want to count
     *   }
     * })
    **/
    count<T extends EProceedingCountArgs>(
      args?: Subset<T, EProceedingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EProceedingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EProceeding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EProceedingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EProceedingAggregateArgs>(args: Subset<T, EProceedingAggregateArgs>): Prisma.PrismaPromise<GetEProceedingAggregateType<T>>

    /**
     * Group by EProceeding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EProceedingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EProceedingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EProceedingGroupByArgs['orderBy'] }
        : { orderBy?: EProceedingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EProceedingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEProceedingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EProceeding model
   */
  readonly fields: EProceedingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EProceeding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EProceedingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assessee<T extends AssesseeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AssesseeDefaultArgs<ExtArgs>>): Prisma__AssesseeClient<$Result.GetResult<Prisma.$AssesseePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    notices<T extends EProceeding$noticesArgs<ExtArgs> = {}>(args?: Subset<T, EProceeding$noticesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EProceeding model
   */
  interface EProceedingFieldRefs {
    readonly id: FieldRef<"EProceeding", 'String'>
    readonly type: FieldRef<"EProceeding", 'String'>
    readonly ay: FieldRef<"EProceeding", 'Int'>
    readonly assesseeId: FieldRef<"EProceeding", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EProceeding findUnique
   */
  export type EProceedingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EProceeding
     */
    select?: EProceedingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EProceeding
     */
    omit?: EProceedingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EProceedingInclude<ExtArgs> | null
    /**
     * Filter, which EProceeding to fetch.
     */
    where: EProceedingWhereUniqueInput
  }

  /**
   * EProceeding findUniqueOrThrow
   */
  export type EProceedingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EProceeding
     */
    select?: EProceedingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EProceeding
     */
    omit?: EProceedingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EProceedingInclude<ExtArgs> | null
    /**
     * Filter, which EProceeding to fetch.
     */
    where: EProceedingWhereUniqueInput
  }

  /**
   * EProceeding findFirst
   */
  export type EProceedingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EProceeding
     */
    select?: EProceedingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EProceeding
     */
    omit?: EProceedingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EProceedingInclude<ExtArgs> | null
    /**
     * Filter, which EProceeding to fetch.
     */
    where?: EProceedingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EProceedings to fetch.
     */
    orderBy?: EProceedingOrderByWithRelationInput | EProceedingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EProceedings.
     */
    cursor?: EProceedingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EProceedings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EProceedings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EProceedings.
     */
    distinct?: EProceedingScalarFieldEnum | EProceedingScalarFieldEnum[]
  }

  /**
   * EProceeding findFirstOrThrow
   */
  export type EProceedingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EProceeding
     */
    select?: EProceedingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EProceeding
     */
    omit?: EProceedingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EProceedingInclude<ExtArgs> | null
    /**
     * Filter, which EProceeding to fetch.
     */
    where?: EProceedingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EProceedings to fetch.
     */
    orderBy?: EProceedingOrderByWithRelationInput | EProceedingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EProceedings.
     */
    cursor?: EProceedingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EProceedings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EProceedings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EProceedings.
     */
    distinct?: EProceedingScalarFieldEnum | EProceedingScalarFieldEnum[]
  }

  /**
   * EProceeding findMany
   */
  export type EProceedingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EProceeding
     */
    select?: EProceedingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EProceeding
     */
    omit?: EProceedingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EProceedingInclude<ExtArgs> | null
    /**
     * Filter, which EProceedings to fetch.
     */
    where?: EProceedingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EProceedings to fetch.
     */
    orderBy?: EProceedingOrderByWithRelationInput | EProceedingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EProceedings.
     */
    cursor?: EProceedingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EProceedings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EProceedings.
     */
    skip?: number
    distinct?: EProceedingScalarFieldEnum | EProceedingScalarFieldEnum[]
  }

  /**
   * EProceeding create
   */
  export type EProceedingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EProceeding
     */
    select?: EProceedingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EProceeding
     */
    omit?: EProceedingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EProceedingInclude<ExtArgs> | null
    /**
     * The data needed to create a EProceeding.
     */
    data: XOR<EProceedingCreateInput, EProceedingUncheckedCreateInput>
  }

  /**
   * EProceeding createMany
   */
  export type EProceedingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EProceedings.
     */
    data: EProceedingCreateManyInput | EProceedingCreateManyInput[]
  }

  /**
   * EProceeding update
   */
  export type EProceedingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EProceeding
     */
    select?: EProceedingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EProceeding
     */
    omit?: EProceedingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EProceedingInclude<ExtArgs> | null
    /**
     * The data needed to update a EProceeding.
     */
    data: XOR<EProceedingUpdateInput, EProceedingUncheckedUpdateInput>
    /**
     * Choose, which EProceeding to update.
     */
    where: EProceedingWhereUniqueInput
  }

  /**
   * EProceeding updateMany
   */
  export type EProceedingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EProceedings.
     */
    data: XOR<EProceedingUpdateManyMutationInput, EProceedingUncheckedUpdateManyInput>
    /**
     * Filter which EProceedings to update
     */
    where?: EProceedingWhereInput
    /**
     * Limit how many EProceedings to update.
     */
    limit?: number
  }

  /**
   * EProceeding upsert
   */
  export type EProceedingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EProceeding
     */
    select?: EProceedingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EProceeding
     */
    omit?: EProceedingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EProceedingInclude<ExtArgs> | null
    /**
     * The filter to search for the EProceeding to update in case it exists.
     */
    where: EProceedingWhereUniqueInput
    /**
     * In case the EProceeding found by the `where` argument doesn't exist, create a new EProceeding with this data.
     */
    create: XOR<EProceedingCreateInput, EProceedingUncheckedCreateInput>
    /**
     * In case the EProceeding was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EProceedingUpdateInput, EProceedingUncheckedUpdateInput>
  }

  /**
   * EProceeding delete
   */
  export type EProceedingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EProceeding
     */
    select?: EProceedingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EProceeding
     */
    omit?: EProceedingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EProceedingInclude<ExtArgs> | null
    /**
     * Filter which EProceeding to delete.
     */
    where: EProceedingWhereUniqueInput
  }

  /**
   * EProceeding deleteMany
   */
  export type EProceedingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EProceedings to delete
     */
    where?: EProceedingWhereInput
    /**
     * Limit how many EProceedings to delete.
     */
    limit?: number
  }

  /**
   * EProceeding findRaw
   */
  export type EProceedingFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * EProceeding aggregateRaw
   */
  export type EProceedingAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * EProceeding.notices
   */
  export type EProceeding$noticesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    where?: NoticeWhereInput
    orderBy?: NoticeOrderByWithRelationInput | NoticeOrderByWithRelationInput[]
    cursor?: NoticeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NoticeScalarFieldEnum | NoticeScalarFieldEnum[]
  }

  /**
   * EProceeding without action
   */
  export type EProceedingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EProceeding
     */
    select?: EProceedingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EProceeding
     */
    omit?: EProceedingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EProceedingInclude<ExtArgs> | null
  }


  /**
   * Model Notice
   */

  export type AggregateNotice = {
    _count: NoticeCountAggregateOutputType | null
    _avg: NoticeAvgAggregateOutputType | null
    _sum: NoticeSumAggregateOutputType | null
    _min: NoticeMinAggregateOutputType | null
    _max: NoticeMaxAggregateOutputType | null
  }

  export type NoticeAvgAggregateOutputType = {
    noticePdfDocId: number | null
  }

  export type NoticeSumAggregateOutputType = {
    noticePdfDocId: bigint | null
  }

  export type NoticeMinAggregateOutputType = {
    id: string | null
    noticeId: string | null
    section: string | null
    noticeType: string | null
    noticeDate: Date | null
    dueDate: Date | null
    noticePdfDocId: bigint | null
    eproceedingId: string | null
  }

  export type NoticeMaxAggregateOutputType = {
    id: string | null
    noticeId: string | null
    section: string | null
    noticeType: string | null
    noticeDate: Date | null
    dueDate: Date | null
    noticePdfDocId: bigint | null
    eproceedingId: string | null
  }

  export type NoticeCountAggregateOutputType = {
    id: number
    noticeId: number
    section: number
    noticeType: number
    noticeDate: number
    dueDate: number
    noticePdfDocId: number
    eproceedingId: number
    _all: number
  }


  export type NoticeAvgAggregateInputType = {
    noticePdfDocId?: true
  }

  export type NoticeSumAggregateInputType = {
    noticePdfDocId?: true
  }

  export type NoticeMinAggregateInputType = {
    id?: true
    noticeId?: true
    section?: true
    noticeType?: true
    noticeDate?: true
    dueDate?: true
    noticePdfDocId?: true
    eproceedingId?: true
  }

  export type NoticeMaxAggregateInputType = {
    id?: true
    noticeId?: true
    section?: true
    noticeType?: true
    noticeDate?: true
    dueDate?: true
    noticePdfDocId?: true
    eproceedingId?: true
  }

  export type NoticeCountAggregateInputType = {
    id?: true
    noticeId?: true
    section?: true
    noticeType?: true
    noticeDate?: true
    dueDate?: true
    noticePdfDocId?: true
    eproceedingId?: true
    _all?: true
  }

  export type NoticeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notice to aggregate.
     */
    where?: NoticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notices to fetch.
     */
    orderBy?: NoticeOrderByWithRelationInput | NoticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NoticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notices
    **/
    _count?: true | NoticeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NoticeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NoticeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NoticeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NoticeMaxAggregateInputType
  }

  export type GetNoticeAggregateType<T extends NoticeAggregateArgs> = {
        [P in keyof T & keyof AggregateNotice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotice[P]>
      : GetScalarType<T[P], AggregateNotice[P]>
  }




  export type NoticeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoticeWhereInput
    orderBy?: NoticeOrderByWithAggregationInput | NoticeOrderByWithAggregationInput[]
    by: NoticeScalarFieldEnum[] | NoticeScalarFieldEnum
    having?: NoticeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NoticeCountAggregateInputType | true
    _avg?: NoticeAvgAggregateInputType
    _sum?: NoticeSumAggregateInputType
    _min?: NoticeMinAggregateInputType
    _max?: NoticeMaxAggregateInputType
  }

  export type NoticeGroupByOutputType = {
    id: string
    noticeId: string
    section: string | null
    noticeType: string | null
    noticeDate: Date | null
    dueDate: Date | null
    noticePdfDocId: bigint | null
    eproceedingId: string
    _count: NoticeCountAggregateOutputType | null
    _avg: NoticeAvgAggregateOutputType | null
    _sum: NoticeSumAggregateOutputType | null
    _min: NoticeMinAggregateOutputType | null
    _max: NoticeMaxAggregateOutputType | null
  }

  type GetNoticeGroupByPayload<T extends NoticeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NoticeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NoticeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NoticeGroupByOutputType[P]>
            : GetScalarType<T[P], NoticeGroupByOutputType[P]>
        }
      >
    >


  export type NoticeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    noticeId?: boolean
    section?: boolean
    noticeType?: boolean
    noticeDate?: boolean
    dueDate?: boolean
    noticePdfDocId?: boolean
    eproceedingId?: boolean
    eproceeding?: boolean | EProceedingDefaultArgs<ExtArgs>
    responses?: boolean | Notice$responsesArgs<ExtArgs>
    documents?: boolean | Notice$documentsArgs<ExtArgs>
    _count?: boolean | NoticeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notice"]>



  export type NoticeSelectScalar = {
    id?: boolean
    noticeId?: boolean
    section?: boolean
    noticeType?: boolean
    noticeDate?: boolean
    dueDate?: boolean
    noticePdfDocId?: boolean
    eproceedingId?: boolean
  }

  export type NoticeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "noticeId" | "section" | "noticeType" | "noticeDate" | "dueDate" | "noticePdfDocId" | "eproceedingId", ExtArgs["result"]["notice"]>
  export type NoticeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eproceeding?: boolean | EProceedingDefaultArgs<ExtArgs>
    responses?: boolean | Notice$responsesArgs<ExtArgs>
    documents?: boolean | Notice$documentsArgs<ExtArgs>
    _count?: boolean | NoticeCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $NoticePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notice"
    objects: {
      eproceeding: Prisma.$EProceedingPayload<ExtArgs>
      responses: Prisma.$ResponsePayload<ExtArgs>[]
      documents: Prisma.$DocumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      noticeId: string
      section: string | null
      noticeType: string | null
      noticeDate: Date | null
      dueDate: Date | null
      noticePdfDocId: bigint | null
      eproceedingId: string
    }, ExtArgs["result"]["notice"]>
    composites: {}
  }

  type NoticeGetPayload<S extends boolean | null | undefined | NoticeDefaultArgs> = $Result.GetResult<Prisma.$NoticePayload, S>

  type NoticeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NoticeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NoticeCountAggregateInputType | true
    }

  export interface NoticeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notice'], meta: { name: 'Notice' } }
    /**
     * Find zero or one Notice that matches the filter.
     * @param {NoticeFindUniqueArgs} args - Arguments to find a Notice
     * @example
     * // Get one Notice
     * const notice = await prisma.notice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NoticeFindUniqueArgs>(args: SelectSubset<T, NoticeFindUniqueArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NoticeFindUniqueOrThrowArgs} args - Arguments to find a Notice
     * @example
     * // Get one Notice
     * const notice = await prisma.notice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NoticeFindUniqueOrThrowArgs>(args: SelectSubset<T, NoticeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeFindFirstArgs} args - Arguments to find a Notice
     * @example
     * // Get one Notice
     * const notice = await prisma.notice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NoticeFindFirstArgs>(args?: SelectSubset<T, NoticeFindFirstArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeFindFirstOrThrowArgs} args - Arguments to find a Notice
     * @example
     * // Get one Notice
     * const notice = await prisma.notice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NoticeFindFirstOrThrowArgs>(args?: SelectSubset<T, NoticeFindFirstOrThrowArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notices
     * const notices = await prisma.notice.findMany()
     * 
     * // Get first 10 Notices
     * const notices = await prisma.notice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const noticeWithIdOnly = await prisma.notice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NoticeFindManyArgs>(args?: SelectSubset<T, NoticeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notice.
     * @param {NoticeCreateArgs} args - Arguments to create a Notice.
     * @example
     * // Create one Notice
     * const Notice = await prisma.notice.create({
     *   data: {
     *     // ... data to create a Notice
     *   }
     * })
     * 
     */
    create<T extends NoticeCreateArgs>(args: SelectSubset<T, NoticeCreateArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notices.
     * @param {NoticeCreateManyArgs} args - Arguments to create many Notices.
     * @example
     * // Create many Notices
     * const notice = await prisma.notice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NoticeCreateManyArgs>(args?: SelectSubset<T, NoticeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Notice.
     * @param {NoticeDeleteArgs} args - Arguments to delete one Notice.
     * @example
     * // Delete one Notice
     * const Notice = await prisma.notice.delete({
     *   where: {
     *     // ... filter to delete one Notice
     *   }
     * })
     * 
     */
    delete<T extends NoticeDeleteArgs>(args: SelectSubset<T, NoticeDeleteArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notice.
     * @param {NoticeUpdateArgs} args - Arguments to update one Notice.
     * @example
     * // Update one Notice
     * const notice = await prisma.notice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NoticeUpdateArgs>(args: SelectSubset<T, NoticeUpdateArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notices.
     * @param {NoticeDeleteManyArgs} args - Arguments to filter Notices to delete.
     * @example
     * // Delete a few Notices
     * const { count } = await prisma.notice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NoticeDeleteManyArgs>(args?: SelectSubset<T, NoticeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notices
     * const notice = await prisma.notice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NoticeUpdateManyArgs>(args: SelectSubset<T, NoticeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notice.
     * @param {NoticeUpsertArgs} args - Arguments to update or create a Notice.
     * @example
     * // Update or create a Notice
     * const notice = await prisma.notice.upsert({
     *   create: {
     *     // ... data to create a Notice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notice we want to update
     *   }
     * })
     */
    upsert<T extends NoticeUpsertArgs>(args: SelectSubset<T, NoticeUpsertArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notices that matches the filter.
     * @param {NoticeFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const notice = await prisma.notice.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: NoticeFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Notice.
     * @param {NoticeAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const notice = await prisma.notice.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: NoticeAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Notices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeCountArgs} args - Arguments to filter Notices to count.
     * @example
     * // Count the number of Notices
     * const count = await prisma.notice.count({
     *   where: {
     *     // ... the filter for the Notices we want to count
     *   }
     * })
    **/
    count<T extends NoticeCountArgs>(
      args?: Subset<T, NoticeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NoticeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NoticeAggregateArgs>(args: Subset<T, NoticeAggregateArgs>): Prisma.PrismaPromise<GetNoticeAggregateType<T>>

    /**
     * Group by Notice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NoticeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NoticeGroupByArgs['orderBy'] }
        : { orderBy?: NoticeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NoticeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNoticeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notice model
   */
  readonly fields: NoticeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NoticeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    eproceeding<T extends EProceedingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EProceedingDefaultArgs<ExtArgs>>): Prisma__EProceedingClient<$Result.GetResult<Prisma.$EProceedingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    responses<T extends Notice$responsesArgs<ExtArgs> = {}>(args?: Subset<T, Notice$responsesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents<T extends Notice$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Notice$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notice model
   */
  interface NoticeFieldRefs {
    readonly id: FieldRef<"Notice", 'String'>
    readonly noticeId: FieldRef<"Notice", 'String'>
    readonly section: FieldRef<"Notice", 'String'>
    readonly noticeType: FieldRef<"Notice", 'String'>
    readonly noticeDate: FieldRef<"Notice", 'DateTime'>
    readonly dueDate: FieldRef<"Notice", 'DateTime'>
    readonly noticePdfDocId: FieldRef<"Notice", 'BigInt'>
    readonly eproceedingId: FieldRef<"Notice", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Notice findUnique
   */
  export type NoticeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    /**
     * Filter, which Notice to fetch.
     */
    where: NoticeWhereUniqueInput
  }

  /**
   * Notice findUniqueOrThrow
   */
  export type NoticeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    /**
     * Filter, which Notice to fetch.
     */
    where: NoticeWhereUniqueInput
  }

  /**
   * Notice findFirst
   */
  export type NoticeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    /**
     * Filter, which Notice to fetch.
     */
    where?: NoticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notices to fetch.
     */
    orderBy?: NoticeOrderByWithRelationInput | NoticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notices.
     */
    cursor?: NoticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notices.
     */
    distinct?: NoticeScalarFieldEnum | NoticeScalarFieldEnum[]
  }

  /**
   * Notice findFirstOrThrow
   */
  export type NoticeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    /**
     * Filter, which Notice to fetch.
     */
    where?: NoticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notices to fetch.
     */
    orderBy?: NoticeOrderByWithRelationInput | NoticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notices.
     */
    cursor?: NoticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notices.
     */
    distinct?: NoticeScalarFieldEnum | NoticeScalarFieldEnum[]
  }

  /**
   * Notice findMany
   */
  export type NoticeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    /**
     * Filter, which Notices to fetch.
     */
    where?: NoticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notices to fetch.
     */
    orderBy?: NoticeOrderByWithRelationInput | NoticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notices.
     */
    cursor?: NoticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notices.
     */
    skip?: number
    distinct?: NoticeScalarFieldEnum | NoticeScalarFieldEnum[]
  }

  /**
   * Notice create
   */
  export type NoticeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    /**
     * The data needed to create a Notice.
     */
    data: XOR<NoticeCreateInput, NoticeUncheckedCreateInput>
  }

  /**
   * Notice createMany
   */
  export type NoticeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notices.
     */
    data: NoticeCreateManyInput | NoticeCreateManyInput[]
  }

  /**
   * Notice update
   */
  export type NoticeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    /**
     * The data needed to update a Notice.
     */
    data: XOR<NoticeUpdateInput, NoticeUncheckedUpdateInput>
    /**
     * Choose, which Notice to update.
     */
    where: NoticeWhereUniqueInput
  }

  /**
   * Notice updateMany
   */
  export type NoticeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notices.
     */
    data: XOR<NoticeUpdateManyMutationInput, NoticeUncheckedUpdateManyInput>
    /**
     * Filter which Notices to update
     */
    where?: NoticeWhereInput
    /**
     * Limit how many Notices to update.
     */
    limit?: number
  }

  /**
   * Notice upsert
   */
  export type NoticeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    /**
     * The filter to search for the Notice to update in case it exists.
     */
    where: NoticeWhereUniqueInput
    /**
     * In case the Notice found by the `where` argument doesn't exist, create a new Notice with this data.
     */
    create: XOR<NoticeCreateInput, NoticeUncheckedCreateInput>
    /**
     * In case the Notice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NoticeUpdateInput, NoticeUncheckedUpdateInput>
  }

  /**
   * Notice delete
   */
  export type NoticeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    /**
     * Filter which Notice to delete.
     */
    where: NoticeWhereUniqueInput
  }

  /**
   * Notice deleteMany
   */
  export type NoticeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notices to delete
     */
    where?: NoticeWhereInput
    /**
     * Limit how many Notices to delete.
     */
    limit?: number
  }

  /**
   * Notice findRaw
   */
  export type NoticeFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Notice aggregateRaw
   */
  export type NoticeAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Notice.responses
   */
  export type Notice$responsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    where?: ResponseWhereInput
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    cursor?: ResponseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * Notice.documents
   */
  export type Notice$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Notice without action
   */
  export type NoticeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
  }


  /**
   * Model Response
   */

  export type AggregateResponse = {
    _count: ResponseCountAggregateOutputType | null
    _min: ResponseMinAggregateOutputType | null
    _max: ResponseMaxAggregateOutputType | null
  }

  export type ResponseMinAggregateOutputType = {
    id: string | null
    status: string | null
    responseDate: Date | null
    remarks: string | null
    noticeId: string | null
  }

  export type ResponseMaxAggregateOutputType = {
    id: string | null
    status: string | null
    responseDate: Date | null
    remarks: string | null
    noticeId: string | null
  }

  export type ResponseCountAggregateOutputType = {
    id: number
    status: number
    responseDate: number
    remarks: number
    noticeId: number
    _all: number
  }


  export type ResponseMinAggregateInputType = {
    id?: true
    status?: true
    responseDate?: true
    remarks?: true
    noticeId?: true
  }

  export type ResponseMaxAggregateInputType = {
    id?: true
    status?: true
    responseDate?: true
    remarks?: true
    noticeId?: true
  }

  export type ResponseCountAggregateInputType = {
    id?: true
    status?: true
    responseDate?: true
    remarks?: true
    noticeId?: true
    _all?: true
  }

  export type ResponseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Response to aggregate.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Responses
    **/
    _count?: true | ResponseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResponseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResponseMaxAggregateInputType
  }

  export type GetResponseAggregateType<T extends ResponseAggregateArgs> = {
        [P in keyof T & keyof AggregateResponse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResponse[P]>
      : GetScalarType<T[P], AggregateResponse[P]>
  }




  export type ResponseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResponseWhereInput
    orderBy?: ResponseOrderByWithAggregationInput | ResponseOrderByWithAggregationInput[]
    by: ResponseScalarFieldEnum[] | ResponseScalarFieldEnum
    having?: ResponseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResponseCountAggregateInputType | true
    _min?: ResponseMinAggregateInputType
    _max?: ResponseMaxAggregateInputType
  }

  export type ResponseGroupByOutputType = {
    id: string
    status: string | null
    responseDate: Date | null
    remarks: string | null
    noticeId: string
    _count: ResponseCountAggregateOutputType | null
    _min: ResponseMinAggregateOutputType | null
    _max: ResponseMaxAggregateOutputType | null
  }

  type GetResponseGroupByPayload<T extends ResponseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResponseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResponseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResponseGroupByOutputType[P]>
            : GetScalarType<T[P], ResponseGroupByOutputType[P]>
        }
      >
    >


  export type ResponseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    responseDate?: boolean
    remarks?: boolean
    noticeId?: boolean
    notice?: boolean | NoticeDefaultArgs<ExtArgs>
    documents?: boolean | Response$documentsArgs<ExtArgs>
    _count?: boolean | ResponseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["response"]>



  export type ResponseSelectScalar = {
    id?: boolean
    status?: boolean
    responseDate?: boolean
    remarks?: boolean
    noticeId?: boolean
  }

  export type ResponseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "status" | "responseDate" | "remarks" | "noticeId", ExtArgs["result"]["response"]>
  export type ResponseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notice?: boolean | NoticeDefaultArgs<ExtArgs>
    documents?: boolean | Response$documentsArgs<ExtArgs>
    _count?: boolean | ResponseCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ResponsePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Response"
    objects: {
      notice: Prisma.$NoticePayload<ExtArgs>
      documents: Prisma.$DocumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: string | null
      responseDate: Date | null
      remarks: string | null
      noticeId: string
    }, ExtArgs["result"]["response"]>
    composites: {}
  }

  type ResponseGetPayload<S extends boolean | null | undefined | ResponseDefaultArgs> = $Result.GetResult<Prisma.$ResponsePayload, S>

  type ResponseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResponseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResponseCountAggregateInputType | true
    }

  export interface ResponseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Response'], meta: { name: 'Response' } }
    /**
     * Find zero or one Response that matches the filter.
     * @param {ResponseFindUniqueArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResponseFindUniqueArgs>(args: SelectSubset<T, ResponseFindUniqueArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Response that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResponseFindUniqueOrThrowArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResponseFindUniqueOrThrowArgs>(args: SelectSubset<T, ResponseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Response that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseFindFirstArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResponseFindFirstArgs>(args?: SelectSubset<T, ResponseFindFirstArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Response that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseFindFirstOrThrowArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResponseFindFirstOrThrowArgs>(args?: SelectSubset<T, ResponseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Responses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Responses
     * const responses = await prisma.response.findMany()
     * 
     * // Get first 10 Responses
     * const responses = await prisma.response.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const responseWithIdOnly = await prisma.response.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResponseFindManyArgs>(args?: SelectSubset<T, ResponseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Response.
     * @param {ResponseCreateArgs} args - Arguments to create a Response.
     * @example
     * // Create one Response
     * const Response = await prisma.response.create({
     *   data: {
     *     // ... data to create a Response
     *   }
     * })
     * 
     */
    create<T extends ResponseCreateArgs>(args: SelectSubset<T, ResponseCreateArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Responses.
     * @param {ResponseCreateManyArgs} args - Arguments to create many Responses.
     * @example
     * // Create many Responses
     * const response = await prisma.response.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResponseCreateManyArgs>(args?: SelectSubset<T, ResponseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Response.
     * @param {ResponseDeleteArgs} args - Arguments to delete one Response.
     * @example
     * // Delete one Response
     * const Response = await prisma.response.delete({
     *   where: {
     *     // ... filter to delete one Response
     *   }
     * })
     * 
     */
    delete<T extends ResponseDeleteArgs>(args: SelectSubset<T, ResponseDeleteArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Response.
     * @param {ResponseUpdateArgs} args - Arguments to update one Response.
     * @example
     * // Update one Response
     * const response = await prisma.response.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResponseUpdateArgs>(args: SelectSubset<T, ResponseUpdateArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Responses.
     * @param {ResponseDeleteManyArgs} args - Arguments to filter Responses to delete.
     * @example
     * // Delete a few Responses
     * const { count } = await prisma.response.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResponseDeleteManyArgs>(args?: SelectSubset<T, ResponseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Responses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Responses
     * const response = await prisma.response.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResponseUpdateManyArgs>(args: SelectSubset<T, ResponseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Response.
     * @param {ResponseUpsertArgs} args - Arguments to update or create a Response.
     * @example
     * // Update or create a Response
     * const response = await prisma.response.upsert({
     *   create: {
     *     // ... data to create a Response
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Response we want to update
     *   }
     * })
     */
    upsert<T extends ResponseUpsertArgs>(args: SelectSubset<T, ResponseUpsertArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Responses that matches the filter.
     * @param {ResponseFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const response = await prisma.response.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ResponseFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Response.
     * @param {ResponseAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const response = await prisma.response.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ResponseAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Responses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseCountArgs} args - Arguments to filter Responses to count.
     * @example
     * // Count the number of Responses
     * const count = await prisma.response.count({
     *   where: {
     *     // ... the filter for the Responses we want to count
     *   }
     * })
    **/
    count<T extends ResponseCountArgs>(
      args?: Subset<T, ResponseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResponseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Response.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResponseAggregateArgs>(args: Subset<T, ResponseAggregateArgs>): Prisma.PrismaPromise<GetResponseAggregateType<T>>

    /**
     * Group by Response.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResponseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResponseGroupByArgs['orderBy'] }
        : { orderBy?: ResponseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResponseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResponseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Response model
   */
  readonly fields: ResponseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Response.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResponseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    notice<T extends NoticeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NoticeDefaultArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    documents<T extends Response$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Response$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Response model
   */
  interface ResponseFieldRefs {
    readonly id: FieldRef<"Response", 'String'>
    readonly status: FieldRef<"Response", 'String'>
    readonly responseDate: FieldRef<"Response", 'DateTime'>
    readonly remarks: FieldRef<"Response", 'String'>
    readonly noticeId: FieldRef<"Response", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Response findUnique
   */
  export type ResponseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response findUniqueOrThrow
   */
  export type ResponseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response findFirst
   */
  export type ResponseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Responses.
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Responses.
     */
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * Response findFirstOrThrow
   */
  export type ResponseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Responses.
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Responses.
     */
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * Response findMany
   */
  export type ResponseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Responses to fetch.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Responses.
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * Response create
   */
  export type ResponseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * The data needed to create a Response.
     */
    data: XOR<ResponseCreateInput, ResponseUncheckedCreateInput>
  }

  /**
   * Response createMany
   */
  export type ResponseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Responses.
     */
    data: ResponseCreateManyInput | ResponseCreateManyInput[]
  }

  /**
   * Response update
   */
  export type ResponseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * The data needed to update a Response.
     */
    data: XOR<ResponseUpdateInput, ResponseUncheckedUpdateInput>
    /**
     * Choose, which Response to update.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response updateMany
   */
  export type ResponseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Responses.
     */
    data: XOR<ResponseUpdateManyMutationInput, ResponseUncheckedUpdateManyInput>
    /**
     * Filter which Responses to update
     */
    where?: ResponseWhereInput
    /**
     * Limit how many Responses to update.
     */
    limit?: number
  }

  /**
   * Response upsert
   */
  export type ResponseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * The filter to search for the Response to update in case it exists.
     */
    where: ResponseWhereUniqueInput
    /**
     * In case the Response found by the `where` argument doesn't exist, create a new Response with this data.
     */
    create: XOR<ResponseCreateInput, ResponseUncheckedCreateInput>
    /**
     * In case the Response was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResponseUpdateInput, ResponseUncheckedUpdateInput>
  }

  /**
   * Response delete
   */
  export type ResponseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter which Response to delete.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response deleteMany
   */
  export type ResponseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Responses to delete
     */
    where?: ResponseWhereInput
    /**
     * Limit how many Responses to delete.
     */
    limit?: number
  }

  /**
   * Response findRaw
   */
  export type ResponseFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Response aggregateRaw
   */
  export type ResponseAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Response.documents
   */
  export type Response$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Response without action
   */
  export type ResponseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentAvgAggregateOutputType = {
    docId: number | null
  }

  export type DocumentSumAggregateOutputType = {
    docId: bigint | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    docId: bigint | null
    name: string | null
    contentType: string | null
    category: string | null
    size: string | null
    noticeId: string | null
    responseId: string | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    docId: bigint | null
    name: string | null
    contentType: string | null
    category: string | null
    size: string | null
    noticeId: string | null
    responseId: string | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    docId: number
    name: number
    contentType: number
    category: number
    size: number
    noticeId: number
    responseId: number
    _all: number
  }


  export type DocumentAvgAggregateInputType = {
    docId?: true
  }

  export type DocumentSumAggregateInputType = {
    docId?: true
  }

  export type DocumentMinAggregateInputType = {
    id?: true
    docId?: true
    name?: true
    contentType?: true
    category?: true
    size?: true
    noticeId?: true
    responseId?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    docId?: true
    name?: true
    contentType?: true
    category?: true
    size?: true
    noticeId?: true
    responseId?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    docId?: true
    name?: true
    contentType?: true
    category?: true
    size?: true
    noticeId?: true
    responseId?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _avg?: DocumentAvgAggregateInputType
    _sum?: DocumentSumAggregateInputType
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    docId: bigint
    name: string | null
    contentType: string | null
    category: string | null
    size: string | null
    noticeId: string | null
    responseId: string | null
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    docId?: boolean
    name?: boolean
    contentType?: boolean
    category?: boolean
    size?: boolean
    noticeId?: boolean
    responseId?: boolean
    notice?: boolean | Document$noticeArgs<ExtArgs>
    response?: boolean | Document$responseArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>



  export type DocumentSelectScalar = {
    id?: boolean
    docId?: boolean
    name?: boolean
    contentType?: boolean
    category?: boolean
    size?: boolean
    noticeId?: boolean
    responseId?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "docId" | "name" | "contentType" | "category" | "size" | "noticeId" | "responseId", ExtArgs["result"]["document"]>
  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notice?: boolean | Document$noticeArgs<ExtArgs>
    response?: boolean | Document$responseArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      notice: Prisma.$NoticePayload<ExtArgs> | null
      response: Prisma.$ResponsePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      docId: bigint
      name: string | null
      contentType: string | null
      category: string | null
      size: string | null
      noticeId: string | null
      responseId: string | null
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * @param {DocumentFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const document = await prisma.document.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: DocumentFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Document.
     * @param {DocumentAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const document = await prisma.document.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: DocumentAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    notice<T extends Document$noticeArgs<ExtArgs> = {}>(args?: Subset<T, Document$noticeArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    response<T extends Document$responseArgs<ExtArgs> = {}>(args?: Subset<T, Document$responseArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly docId: FieldRef<"Document", 'BigInt'>
    readonly name: FieldRef<"Document", 'String'>
    readonly contentType: FieldRef<"Document", 'String'>
    readonly category: FieldRef<"Document", 'String'>
    readonly size: FieldRef<"Document", 'String'>
    readonly noticeId: FieldRef<"Document", 'String'>
    readonly responseId: FieldRef<"Document", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document findRaw
   */
  export type DocumentFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Document aggregateRaw
   */
  export type DocumentAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Document.notice
   */
  export type Document$noticeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    where?: NoticeWhereInput
  }

  /**
   * Document.response
   */
  export type Document$responseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    where?: ResponseWhereInput
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const AssesseeScalarFieldEnum: {
    id: 'id',
    pan: 'pan',
    name: 'name',
    lastSyncedOn: 'lastSyncedOn'
  };

  export type AssesseeScalarFieldEnum = (typeof AssesseeScalarFieldEnum)[keyof typeof AssesseeScalarFieldEnum]


  export const EProceedingScalarFieldEnum: {
    id: 'id',
    type: 'type',
    ay: 'ay',
    assesseeId: 'assesseeId'
  };

  export type EProceedingScalarFieldEnum = (typeof EProceedingScalarFieldEnum)[keyof typeof EProceedingScalarFieldEnum]


  export const NoticeScalarFieldEnum: {
    id: 'id',
    noticeId: 'noticeId',
    section: 'section',
    noticeType: 'noticeType',
    noticeDate: 'noticeDate',
    dueDate: 'dueDate',
    noticePdfDocId: 'noticePdfDocId',
    eproceedingId: 'eproceedingId'
  };

  export type NoticeScalarFieldEnum = (typeof NoticeScalarFieldEnum)[keyof typeof NoticeScalarFieldEnum]


  export const ResponseScalarFieldEnum: {
    id: 'id',
    status: 'status',
    responseDate: 'responseDate',
    remarks: 'remarks',
    noticeId: 'noticeId'
  };

  export type ResponseScalarFieldEnum = (typeof ResponseScalarFieldEnum)[keyof typeof ResponseScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    docId: 'docId',
    name: 'name',
    contentType: 'contentType',
    category: 'category',
    size: 'size',
    noticeId: 'noticeId',
    responseId: 'responseId'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AssesseeWhereInput = {
    AND?: AssesseeWhereInput | AssesseeWhereInput[]
    OR?: AssesseeWhereInput[]
    NOT?: AssesseeWhereInput | AssesseeWhereInput[]
    id?: StringFilter<"Assessee"> | string
    pan?: StringFilter<"Assessee"> | string
    name?: StringNullableFilter<"Assessee"> | string | null
    lastSyncedOn?: DateTimeNullableFilter<"Assessee"> | Date | string | null
    eproceedings?: EProceedingListRelationFilter
  }

  export type AssesseeOrderByWithRelationInput = {
    id?: SortOrder
    pan?: SortOrder
    name?: SortOrder
    lastSyncedOn?: SortOrder
    eproceedings?: EProceedingOrderByRelationAggregateInput
  }

  export type AssesseeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    pan?: string
    AND?: AssesseeWhereInput | AssesseeWhereInput[]
    OR?: AssesseeWhereInput[]
    NOT?: AssesseeWhereInput | AssesseeWhereInput[]
    name?: StringNullableFilter<"Assessee"> | string | null
    lastSyncedOn?: DateTimeNullableFilter<"Assessee"> | Date | string | null
    eproceedings?: EProceedingListRelationFilter
  }, "id" | "pan">

  export type AssesseeOrderByWithAggregationInput = {
    id?: SortOrder
    pan?: SortOrder
    name?: SortOrder
    lastSyncedOn?: SortOrder
    _count?: AssesseeCountOrderByAggregateInput
    _max?: AssesseeMaxOrderByAggregateInput
    _min?: AssesseeMinOrderByAggregateInput
  }

  export type AssesseeScalarWhereWithAggregatesInput = {
    AND?: AssesseeScalarWhereWithAggregatesInput | AssesseeScalarWhereWithAggregatesInput[]
    OR?: AssesseeScalarWhereWithAggregatesInput[]
    NOT?: AssesseeScalarWhereWithAggregatesInput | AssesseeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Assessee"> | string
    pan?: StringWithAggregatesFilter<"Assessee"> | string
    name?: StringNullableWithAggregatesFilter<"Assessee"> | string | null
    lastSyncedOn?: DateTimeNullableWithAggregatesFilter<"Assessee"> | Date | string | null
  }

  export type EProceedingWhereInput = {
    AND?: EProceedingWhereInput | EProceedingWhereInput[]
    OR?: EProceedingWhereInput[]
    NOT?: EProceedingWhereInput | EProceedingWhereInput[]
    id?: StringFilter<"EProceeding"> | string
    type?: StringNullableFilter<"EProceeding"> | string | null
    ay?: IntNullableFilter<"EProceeding"> | number | null
    assesseeId?: StringFilter<"EProceeding"> | string
    assessee?: XOR<AssesseeScalarRelationFilter, AssesseeWhereInput>
    notices?: NoticeListRelationFilter
  }

  export type EProceedingOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    ay?: SortOrder
    assesseeId?: SortOrder
    assessee?: AssesseeOrderByWithRelationInput
    notices?: NoticeOrderByRelationAggregateInput
  }

  export type EProceedingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EProceedingWhereInput | EProceedingWhereInput[]
    OR?: EProceedingWhereInput[]
    NOT?: EProceedingWhereInput | EProceedingWhereInput[]
    type?: StringNullableFilter<"EProceeding"> | string | null
    ay?: IntNullableFilter<"EProceeding"> | number | null
    assesseeId?: StringFilter<"EProceeding"> | string
    assessee?: XOR<AssesseeScalarRelationFilter, AssesseeWhereInput>
    notices?: NoticeListRelationFilter
  }, "id">

  export type EProceedingOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    ay?: SortOrder
    assesseeId?: SortOrder
    _count?: EProceedingCountOrderByAggregateInput
    _avg?: EProceedingAvgOrderByAggregateInput
    _max?: EProceedingMaxOrderByAggregateInput
    _min?: EProceedingMinOrderByAggregateInput
    _sum?: EProceedingSumOrderByAggregateInput
  }

  export type EProceedingScalarWhereWithAggregatesInput = {
    AND?: EProceedingScalarWhereWithAggregatesInput | EProceedingScalarWhereWithAggregatesInput[]
    OR?: EProceedingScalarWhereWithAggregatesInput[]
    NOT?: EProceedingScalarWhereWithAggregatesInput | EProceedingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EProceeding"> | string
    type?: StringNullableWithAggregatesFilter<"EProceeding"> | string | null
    ay?: IntNullableWithAggregatesFilter<"EProceeding"> | number | null
    assesseeId?: StringWithAggregatesFilter<"EProceeding"> | string
  }

  export type NoticeWhereInput = {
    AND?: NoticeWhereInput | NoticeWhereInput[]
    OR?: NoticeWhereInput[]
    NOT?: NoticeWhereInput | NoticeWhereInput[]
    id?: StringFilter<"Notice"> | string
    noticeId?: StringFilter<"Notice"> | string
    section?: StringNullableFilter<"Notice"> | string | null
    noticeType?: StringNullableFilter<"Notice"> | string | null
    noticeDate?: DateTimeNullableFilter<"Notice"> | Date | string | null
    dueDate?: DateTimeNullableFilter<"Notice"> | Date | string | null
    noticePdfDocId?: BigIntNullableFilter<"Notice"> | bigint | number | null
    eproceedingId?: StringFilter<"Notice"> | string
    eproceeding?: XOR<EProceedingScalarRelationFilter, EProceedingWhereInput>
    responses?: ResponseListRelationFilter
    documents?: DocumentListRelationFilter
  }

  export type NoticeOrderByWithRelationInput = {
    id?: SortOrder
    noticeId?: SortOrder
    section?: SortOrder
    noticeType?: SortOrder
    noticeDate?: SortOrder
    dueDate?: SortOrder
    noticePdfDocId?: SortOrder
    eproceedingId?: SortOrder
    eproceeding?: EProceedingOrderByWithRelationInput
    responses?: ResponseOrderByRelationAggregateInput
    documents?: DocumentOrderByRelationAggregateInput
  }

  export type NoticeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    noticeId?: string
    AND?: NoticeWhereInput | NoticeWhereInput[]
    OR?: NoticeWhereInput[]
    NOT?: NoticeWhereInput | NoticeWhereInput[]
    section?: StringNullableFilter<"Notice"> | string | null
    noticeType?: StringNullableFilter<"Notice"> | string | null
    noticeDate?: DateTimeNullableFilter<"Notice"> | Date | string | null
    dueDate?: DateTimeNullableFilter<"Notice"> | Date | string | null
    noticePdfDocId?: BigIntNullableFilter<"Notice"> | bigint | number | null
    eproceedingId?: StringFilter<"Notice"> | string
    eproceeding?: XOR<EProceedingScalarRelationFilter, EProceedingWhereInput>
    responses?: ResponseListRelationFilter
    documents?: DocumentListRelationFilter
  }, "id" | "noticeId">

  export type NoticeOrderByWithAggregationInput = {
    id?: SortOrder
    noticeId?: SortOrder
    section?: SortOrder
    noticeType?: SortOrder
    noticeDate?: SortOrder
    dueDate?: SortOrder
    noticePdfDocId?: SortOrder
    eproceedingId?: SortOrder
    _count?: NoticeCountOrderByAggregateInput
    _avg?: NoticeAvgOrderByAggregateInput
    _max?: NoticeMaxOrderByAggregateInput
    _min?: NoticeMinOrderByAggregateInput
    _sum?: NoticeSumOrderByAggregateInput
  }

  export type NoticeScalarWhereWithAggregatesInput = {
    AND?: NoticeScalarWhereWithAggregatesInput | NoticeScalarWhereWithAggregatesInput[]
    OR?: NoticeScalarWhereWithAggregatesInput[]
    NOT?: NoticeScalarWhereWithAggregatesInput | NoticeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notice"> | string
    noticeId?: StringWithAggregatesFilter<"Notice"> | string
    section?: StringNullableWithAggregatesFilter<"Notice"> | string | null
    noticeType?: StringNullableWithAggregatesFilter<"Notice"> | string | null
    noticeDate?: DateTimeNullableWithAggregatesFilter<"Notice"> | Date | string | null
    dueDate?: DateTimeNullableWithAggregatesFilter<"Notice"> | Date | string | null
    noticePdfDocId?: BigIntNullableWithAggregatesFilter<"Notice"> | bigint | number | null
    eproceedingId?: StringWithAggregatesFilter<"Notice"> | string
  }

  export type ResponseWhereInput = {
    AND?: ResponseWhereInput | ResponseWhereInput[]
    OR?: ResponseWhereInput[]
    NOT?: ResponseWhereInput | ResponseWhereInput[]
    id?: StringFilter<"Response"> | string
    status?: StringNullableFilter<"Response"> | string | null
    responseDate?: DateTimeNullableFilter<"Response"> | Date | string | null
    remarks?: StringNullableFilter<"Response"> | string | null
    noticeId?: StringFilter<"Response"> | string
    notice?: XOR<NoticeScalarRelationFilter, NoticeWhereInput>
    documents?: DocumentListRelationFilter
  }

  export type ResponseOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    responseDate?: SortOrder
    remarks?: SortOrder
    noticeId?: SortOrder
    notice?: NoticeOrderByWithRelationInput
    documents?: DocumentOrderByRelationAggregateInput
  }

  export type ResponseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResponseWhereInput | ResponseWhereInput[]
    OR?: ResponseWhereInput[]
    NOT?: ResponseWhereInput | ResponseWhereInput[]
    status?: StringNullableFilter<"Response"> | string | null
    responseDate?: DateTimeNullableFilter<"Response"> | Date | string | null
    remarks?: StringNullableFilter<"Response"> | string | null
    noticeId?: StringFilter<"Response"> | string
    notice?: XOR<NoticeScalarRelationFilter, NoticeWhereInput>
    documents?: DocumentListRelationFilter
  }, "id">

  export type ResponseOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    responseDate?: SortOrder
    remarks?: SortOrder
    noticeId?: SortOrder
    _count?: ResponseCountOrderByAggregateInput
    _max?: ResponseMaxOrderByAggregateInput
    _min?: ResponseMinOrderByAggregateInput
  }

  export type ResponseScalarWhereWithAggregatesInput = {
    AND?: ResponseScalarWhereWithAggregatesInput | ResponseScalarWhereWithAggregatesInput[]
    OR?: ResponseScalarWhereWithAggregatesInput[]
    NOT?: ResponseScalarWhereWithAggregatesInput | ResponseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Response"> | string
    status?: StringNullableWithAggregatesFilter<"Response"> | string | null
    responseDate?: DateTimeNullableWithAggregatesFilter<"Response"> | Date | string | null
    remarks?: StringNullableWithAggregatesFilter<"Response"> | string | null
    noticeId?: StringWithAggregatesFilter<"Response"> | string
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    docId?: BigIntFilter<"Document"> | bigint | number
    name?: StringNullableFilter<"Document"> | string | null
    contentType?: StringNullableFilter<"Document"> | string | null
    category?: StringNullableFilter<"Document"> | string | null
    size?: StringNullableFilter<"Document"> | string | null
    noticeId?: StringNullableFilter<"Document"> | string | null
    responseId?: StringNullableFilter<"Document"> | string | null
    notice?: XOR<NoticeNullableScalarRelationFilter, NoticeWhereInput> | null
    response?: XOR<ResponseNullableScalarRelationFilter, ResponseWhereInput> | null
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    docId?: SortOrder
    name?: SortOrder
    contentType?: SortOrder
    category?: SortOrder
    size?: SortOrder
    noticeId?: SortOrder
    responseId?: SortOrder
    notice?: NoticeOrderByWithRelationInput
    response?: ResponseOrderByWithRelationInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    docId?: bigint | number
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    name?: StringNullableFilter<"Document"> | string | null
    contentType?: StringNullableFilter<"Document"> | string | null
    category?: StringNullableFilter<"Document"> | string | null
    size?: StringNullableFilter<"Document"> | string | null
    noticeId?: StringNullableFilter<"Document"> | string | null
    responseId?: StringNullableFilter<"Document"> | string | null
    notice?: XOR<NoticeNullableScalarRelationFilter, NoticeWhereInput> | null
    response?: XOR<ResponseNullableScalarRelationFilter, ResponseWhereInput> | null
  }, "id" | "docId">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    docId?: SortOrder
    name?: SortOrder
    contentType?: SortOrder
    category?: SortOrder
    size?: SortOrder
    noticeId?: SortOrder
    responseId?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _avg?: DocumentAvgOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
    _sum?: DocumentSumOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    docId?: BigIntWithAggregatesFilter<"Document"> | bigint | number
    name?: StringNullableWithAggregatesFilter<"Document"> | string | null
    contentType?: StringNullableWithAggregatesFilter<"Document"> | string | null
    category?: StringNullableWithAggregatesFilter<"Document"> | string | null
    size?: StringNullableWithAggregatesFilter<"Document"> | string | null
    noticeId?: StringNullableWithAggregatesFilter<"Document"> | string | null
    responseId?: StringNullableWithAggregatesFilter<"Document"> | string | null
  }

  export type AssesseeCreateInput = {
    id?: string
    pan: string
    name?: string | null
    lastSyncedOn?: Date | string | null
    eproceedings?: EProceedingCreateNestedManyWithoutAssesseeInput
  }

  export type AssesseeUncheckedCreateInput = {
    id?: string
    pan: string
    name?: string | null
    lastSyncedOn?: Date | string | null
    eproceedings?: EProceedingUncheckedCreateNestedManyWithoutAssesseeInput
  }

  export type AssesseeUpdateInput = {
    pan?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedOn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eproceedings?: EProceedingUpdateManyWithoutAssesseeNestedInput
  }

  export type AssesseeUncheckedUpdateInput = {
    pan?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedOn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eproceedings?: EProceedingUncheckedUpdateManyWithoutAssesseeNestedInput
  }

  export type AssesseeCreateManyInput = {
    id?: string
    pan: string
    name?: string | null
    lastSyncedOn?: Date | string | null
  }

  export type AssesseeUpdateManyMutationInput = {
    pan?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedOn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AssesseeUncheckedUpdateManyInput = {
    pan?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedOn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EProceedingCreateInput = {
    id?: string
    type?: string | null
    ay?: number | null
    assessee: AssesseeCreateNestedOneWithoutEproceedingsInput
    notices?: NoticeCreateNestedManyWithoutEproceedingInput
  }

  export type EProceedingUncheckedCreateInput = {
    id?: string
    type?: string | null
    ay?: number | null
    assesseeId: string
    notices?: NoticeUncheckedCreateNestedManyWithoutEproceedingInput
  }

  export type EProceedingUpdateInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    ay?: NullableIntFieldUpdateOperationsInput | number | null
    assessee?: AssesseeUpdateOneRequiredWithoutEproceedingsNestedInput
    notices?: NoticeUpdateManyWithoutEproceedingNestedInput
  }

  export type EProceedingUncheckedUpdateInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    ay?: NullableIntFieldUpdateOperationsInput | number | null
    assesseeId?: StringFieldUpdateOperationsInput | string
    notices?: NoticeUncheckedUpdateManyWithoutEproceedingNestedInput
  }

  export type EProceedingCreateManyInput = {
    id?: string
    type?: string | null
    ay?: number | null
    assesseeId: string
  }

  export type EProceedingUpdateManyMutationInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    ay?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type EProceedingUncheckedUpdateManyInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    ay?: NullableIntFieldUpdateOperationsInput | number | null
    assesseeId?: StringFieldUpdateOperationsInput | string
  }

  export type NoticeCreateInput = {
    id?: string
    noticeId: string
    section?: string | null
    noticeType?: string | null
    noticeDate?: Date | string | null
    dueDate?: Date | string | null
    noticePdfDocId?: bigint | number | null
    eproceeding: EProceedingCreateNestedOneWithoutNoticesInput
    responses?: ResponseCreateNestedManyWithoutNoticeInput
    documents?: DocumentCreateNestedManyWithoutNoticeInput
  }

  export type NoticeUncheckedCreateInput = {
    id?: string
    noticeId: string
    section?: string | null
    noticeType?: string | null
    noticeDate?: Date | string | null
    dueDate?: Date | string | null
    noticePdfDocId?: bigint | number | null
    eproceedingId: string
    responses?: ResponseUncheckedCreateNestedManyWithoutNoticeInput
    documents?: DocumentUncheckedCreateNestedManyWithoutNoticeInput
  }

  export type NoticeUpdateInput = {
    noticeId?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    noticeType?: NullableStringFieldUpdateOperationsInput | string | null
    noticeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noticePdfDocId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    eproceeding?: EProceedingUpdateOneRequiredWithoutNoticesNestedInput
    responses?: ResponseUpdateManyWithoutNoticeNestedInput
    documents?: DocumentUpdateManyWithoutNoticeNestedInput
  }

  export type NoticeUncheckedUpdateInput = {
    noticeId?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    noticeType?: NullableStringFieldUpdateOperationsInput | string | null
    noticeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noticePdfDocId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    eproceedingId?: StringFieldUpdateOperationsInput | string
    responses?: ResponseUncheckedUpdateManyWithoutNoticeNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutNoticeNestedInput
  }

  export type NoticeCreateManyInput = {
    id?: string
    noticeId: string
    section?: string | null
    noticeType?: string | null
    noticeDate?: Date | string | null
    dueDate?: Date | string | null
    noticePdfDocId?: bigint | number | null
    eproceedingId: string
  }

  export type NoticeUpdateManyMutationInput = {
    noticeId?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    noticeType?: NullableStringFieldUpdateOperationsInput | string | null
    noticeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noticePdfDocId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type NoticeUncheckedUpdateManyInput = {
    noticeId?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    noticeType?: NullableStringFieldUpdateOperationsInput | string | null
    noticeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noticePdfDocId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    eproceedingId?: StringFieldUpdateOperationsInput | string
  }

  export type ResponseCreateInput = {
    id?: string
    status?: string | null
    responseDate?: Date | string | null
    remarks?: string | null
    notice: NoticeCreateNestedOneWithoutResponsesInput
    documents?: DocumentCreateNestedManyWithoutResponseInput
  }

  export type ResponseUncheckedCreateInput = {
    id?: string
    status?: string | null
    responseDate?: Date | string | null
    remarks?: string | null
    noticeId: string
    documents?: DocumentUncheckedCreateNestedManyWithoutResponseInput
  }

  export type ResponseUpdateInput = {
    status?: NullableStringFieldUpdateOperationsInput | string | null
    responseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    notice?: NoticeUpdateOneRequiredWithoutResponsesNestedInput
    documents?: DocumentUpdateManyWithoutResponseNestedInput
  }

  export type ResponseUncheckedUpdateInput = {
    status?: NullableStringFieldUpdateOperationsInput | string | null
    responseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    noticeId?: StringFieldUpdateOperationsInput | string
    documents?: DocumentUncheckedUpdateManyWithoutResponseNestedInput
  }

  export type ResponseCreateManyInput = {
    id?: string
    status?: string | null
    responseDate?: Date | string | null
    remarks?: string | null
    noticeId: string
  }

  export type ResponseUpdateManyMutationInput = {
    status?: NullableStringFieldUpdateOperationsInput | string | null
    responseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResponseUncheckedUpdateManyInput = {
    status?: NullableStringFieldUpdateOperationsInput | string | null
    responseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    noticeId?: StringFieldUpdateOperationsInput | string
  }

  export type DocumentCreateInput = {
    id?: string
    docId: bigint | number
    name?: string | null
    contentType?: string | null
    category?: string | null
    size?: string | null
    notice?: NoticeCreateNestedOneWithoutDocumentsInput
    response?: ResponseCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    docId: bigint | number
    name?: string | null
    contentType?: string | null
    category?: string | null
    size?: string | null
    noticeId?: string | null
    responseId?: string | null
  }

  export type DocumentUpdateInput = {
    docId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    notice?: NoticeUpdateOneWithoutDocumentsNestedInput
    response?: ResponseUpdateOneWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    docId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    noticeId?: NullableStringFieldUpdateOperationsInput | string | null
    responseId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentCreateManyInput = {
    id?: string
    docId: bigint | number
    name?: string | null
    contentType?: string | null
    category?: string | null
    size?: string | null
    noticeId?: string | null
    responseId?: string | null
  }

  export type DocumentUpdateManyMutationInput = {
    docId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentUncheckedUpdateManyInput = {
    docId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    noticeId?: NullableStringFieldUpdateOperationsInput | string | null
    responseId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type EProceedingListRelationFilter = {
    every?: EProceedingWhereInput
    some?: EProceedingWhereInput
    none?: EProceedingWhereInput
  }

  export type EProceedingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AssesseeCountOrderByAggregateInput = {
    id?: SortOrder
    pan?: SortOrder
    name?: SortOrder
    lastSyncedOn?: SortOrder
  }

  export type AssesseeMaxOrderByAggregateInput = {
    id?: SortOrder
    pan?: SortOrder
    name?: SortOrder
    lastSyncedOn?: SortOrder
  }

  export type AssesseeMinOrderByAggregateInput = {
    id?: SortOrder
    pan?: SortOrder
    name?: SortOrder
    lastSyncedOn?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type AssesseeScalarRelationFilter = {
    is?: AssesseeWhereInput
    isNot?: AssesseeWhereInput
  }

  export type NoticeListRelationFilter = {
    every?: NoticeWhereInput
    some?: NoticeWhereInput
    none?: NoticeWhereInput
  }

  export type NoticeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EProceedingCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    ay?: SortOrder
    assesseeId?: SortOrder
  }

  export type EProceedingAvgOrderByAggregateInput = {
    ay?: SortOrder
  }

  export type EProceedingMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    ay?: SortOrder
    assesseeId?: SortOrder
  }

  export type EProceedingMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    ay?: SortOrder
    assesseeId?: SortOrder
  }

  export type EProceedingSumOrderByAggregateInput = {
    ay?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
    isSet?: boolean
  }

  export type EProceedingScalarRelationFilter = {
    is?: EProceedingWhereInput
    isNot?: EProceedingWhereInput
  }

  export type ResponseListRelationFilter = {
    every?: ResponseWhereInput
    some?: ResponseWhereInput
    none?: ResponseWhereInput
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type ResponseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NoticeCountOrderByAggregateInput = {
    id?: SortOrder
    noticeId?: SortOrder
    section?: SortOrder
    noticeType?: SortOrder
    noticeDate?: SortOrder
    dueDate?: SortOrder
    noticePdfDocId?: SortOrder
    eproceedingId?: SortOrder
  }

  export type NoticeAvgOrderByAggregateInput = {
    noticePdfDocId?: SortOrder
  }

  export type NoticeMaxOrderByAggregateInput = {
    id?: SortOrder
    noticeId?: SortOrder
    section?: SortOrder
    noticeType?: SortOrder
    noticeDate?: SortOrder
    dueDate?: SortOrder
    noticePdfDocId?: SortOrder
    eproceedingId?: SortOrder
  }

  export type NoticeMinOrderByAggregateInput = {
    id?: SortOrder
    noticeId?: SortOrder
    section?: SortOrder
    noticeType?: SortOrder
    noticeDate?: SortOrder
    dueDate?: SortOrder
    noticePdfDocId?: SortOrder
    eproceedingId?: SortOrder
  }

  export type NoticeSumOrderByAggregateInput = {
    noticePdfDocId?: SortOrder
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NoticeScalarRelationFilter = {
    is?: NoticeWhereInput
    isNot?: NoticeWhereInput
  }

  export type ResponseCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    responseDate?: SortOrder
    remarks?: SortOrder
    noticeId?: SortOrder
  }

  export type ResponseMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    responseDate?: SortOrder
    remarks?: SortOrder
    noticeId?: SortOrder
  }

  export type ResponseMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    responseDate?: SortOrder
    remarks?: SortOrder
    noticeId?: SortOrder
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NoticeNullableScalarRelationFilter = {
    is?: NoticeWhereInput | null
    isNot?: NoticeWhereInput | null
  }

  export type ResponseNullableScalarRelationFilter = {
    is?: ResponseWhereInput | null
    isNot?: ResponseWhereInput | null
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    docId?: SortOrder
    name?: SortOrder
    contentType?: SortOrder
    category?: SortOrder
    size?: SortOrder
    noticeId?: SortOrder
    responseId?: SortOrder
  }

  export type DocumentAvgOrderByAggregateInput = {
    docId?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    docId?: SortOrder
    name?: SortOrder
    contentType?: SortOrder
    category?: SortOrder
    size?: SortOrder
    noticeId?: SortOrder
    responseId?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    docId?: SortOrder
    name?: SortOrder
    contentType?: SortOrder
    category?: SortOrder
    size?: SortOrder
    noticeId?: SortOrder
    responseId?: SortOrder
  }

  export type DocumentSumOrderByAggregateInput = {
    docId?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type EProceedingCreateNestedManyWithoutAssesseeInput = {
    create?: XOR<EProceedingCreateWithoutAssesseeInput, EProceedingUncheckedCreateWithoutAssesseeInput> | EProceedingCreateWithoutAssesseeInput[] | EProceedingUncheckedCreateWithoutAssesseeInput[]
    connectOrCreate?: EProceedingCreateOrConnectWithoutAssesseeInput | EProceedingCreateOrConnectWithoutAssesseeInput[]
    createMany?: EProceedingCreateManyAssesseeInputEnvelope
    connect?: EProceedingWhereUniqueInput | EProceedingWhereUniqueInput[]
  }

  export type EProceedingUncheckedCreateNestedManyWithoutAssesseeInput = {
    create?: XOR<EProceedingCreateWithoutAssesseeInput, EProceedingUncheckedCreateWithoutAssesseeInput> | EProceedingCreateWithoutAssesseeInput[] | EProceedingUncheckedCreateWithoutAssesseeInput[]
    connectOrCreate?: EProceedingCreateOrConnectWithoutAssesseeInput | EProceedingCreateOrConnectWithoutAssesseeInput[]
    createMany?: EProceedingCreateManyAssesseeInputEnvelope
    connect?: EProceedingWhereUniqueInput | EProceedingWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type EProceedingUpdateManyWithoutAssesseeNestedInput = {
    create?: XOR<EProceedingCreateWithoutAssesseeInput, EProceedingUncheckedCreateWithoutAssesseeInput> | EProceedingCreateWithoutAssesseeInput[] | EProceedingUncheckedCreateWithoutAssesseeInput[]
    connectOrCreate?: EProceedingCreateOrConnectWithoutAssesseeInput | EProceedingCreateOrConnectWithoutAssesseeInput[]
    upsert?: EProceedingUpsertWithWhereUniqueWithoutAssesseeInput | EProceedingUpsertWithWhereUniqueWithoutAssesseeInput[]
    createMany?: EProceedingCreateManyAssesseeInputEnvelope
    set?: EProceedingWhereUniqueInput | EProceedingWhereUniqueInput[]
    disconnect?: EProceedingWhereUniqueInput | EProceedingWhereUniqueInput[]
    delete?: EProceedingWhereUniqueInput | EProceedingWhereUniqueInput[]
    connect?: EProceedingWhereUniqueInput | EProceedingWhereUniqueInput[]
    update?: EProceedingUpdateWithWhereUniqueWithoutAssesseeInput | EProceedingUpdateWithWhereUniqueWithoutAssesseeInput[]
    updateMany?: EProceedingUpdateManyWithWhereWithoutAssesseeInput | EProceedingUpdateManyWithWhereWithoutAssesseeInput[]
    deleteMany?: EProceedingScalarWhereInput | EProceedingScalarWhereInput[]
  }

  export type EProceedingUncheckedUpdateManyWithoutAssesseeNestedInput = {
    create?: XOR<EProceedingCreateWithoutAssesseeInput, EProceedingUncheckedCreateWithoutAssesseeInput> | EProceedingCreateWithoutAssesseeInput[] | EProceedingUncheckedCreateWithoutAssesseeInput[]
    connectOrCreate?: EProceedingCreateOrConnectWithoutAssesseeInput | EProceedingCreateOrConnectWithoutAssesseeInput[]
    upsert?: EProceedingUpsertWithWhereUniqueWithoutAssesseeInput | EProceedingUpsertWithWhereUniqueWithoutAssesseeInput[]
    createMany?: EProceedingCreateManyAssesseeInputEnvelope
    set?: EProceedingWhereUniqueInput | EProceedingWhereUniqueInput[]
    disconnect?: EProceedingWhereUniqueInput | EProceedingWhereUniqueInput[]
    delete?: EProceedingWhereUniqueInput | EProceedingWhereUniqueInput[]
    connect?: EProceedingWhereUniqueInput | EProceedingWhereUniqueInput[]
    update?: EProceedingUpdateWithWhereUniqueWithoutAssesseeInput | EProceedingUpdateWithWhereUniqueWithoutAssesseeInput[]
    updateMany?: EProceedingUpdateManyWithWhereWithoutAssesseeInput | EProceedingUpdateManyWithWhereWithoutAssesseeInput[]
    deleteMany?: EProceedingScalarWhereInput | EProceedingScalarWhereInput[]
  }

  export type AssesseeCreateNestedOneWithoutEproceedingsInput = {
    create?: XOR<AssesseeCreateWithoutEproceedingsInput, AssesseeUncheckedCreateWithoutEproceedingsInput>
    connectOrCreate?: AssesseeCreateOrConnectWithoutEproceedingsInput
    connect?: AssesseeWhereUniqueInput
  }

  export type NoticeCreateNestedManyWithoutEproceedingInput = {
    create?: XOR<NoticeCreateWithoutEproceedingInput, NoticeUncheckedCreateWithoutEproceedingInput> | NoticeCreateWithoutEproceedingInput[] | NoticeUncheckedCreateWithoutEproceedingInput[]
    connectOrCreate?: NoticeCreateOrConnectWithoutEproceedingInput | NoticeCreateOrConnectWithoutEproceedingInput[]
    createMany?: NoticeCreateManyEproceedingInputEnvelope
    connect?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
  }

  export type NoticeUncheckedCreateNestedManyWithoutEproceedingInput = {
    create?: XOR<NoticeCreateWithoutEproceedingInput, NoticeUncheckedCreateWithoutEproceedingInput> | NoticeCreateWithoutEproceedingInput[] | NoticeUncheckedCreateWithoutEproceedingInput[]
    connectOrCreate?: NoticeCreateOrConnectWithoutEproceedingInput | NoticeCreateOrConnectWithoutEproceedingInput[]
    createMany?: NoticeCreateManyEproceedingInputEnvelope
    connect?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type AssesseeUpdateOneRequiredWithoutEproceedingsNestedInput = {
    create?: XOR<AssesseeCreateWithoutEproceedingsInput, AssesseeUncheckedCreateWithoutEproceedingsInput>
    connectOrCreate?: AssesseeCreateOrConnectWithoutEproceedingsInput
    upsert?: AssesseeUpsertWithoutEproceedingsInput
    connect?: AssesseeWhereUniqueInput
    update?: XOR<XOR<AssesseeUpdateToOneWithWhereWithoutEproceedingsInput, AssesseeUpdateWithoutEproceedingsInput>, AssesseeUncheckedUpdateWithoutEproceedingsInput>
  }

  export type NoticeUpdateManyWithoutEproceedingNestedInput = {
    create?: XOR<NoticeCreateWithoutEproceedingInput, NoticeUncheckedCreateWithoutEproceedingInput> | NoticeCreateWithoutEproceedingInput[] | NoticeUncheckedCreateWithoutEproceedingInput[]
    connectOrCreate?: NoticeCreateOrConnectWithoutEproceedingInput | NoticeCreateOrConnectWithoutEproceedingInput[]
    upsert?: NoticeUpsertWithWhereUniqueWithoutEproceedingInput | NoticeUpsertWithWhereUniqueWithoutEproceedingInput[]
    createMany?: NoticeCreateManyEproceedingInputEnvelope
    set?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    disconnect?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    delete?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    connect?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    update?: NoticeUpdateWithWhereUniqueWithoutEproceedingInput | NoticeUpdateWithWhereUniqueWithoutEproceedingInput[]
    updateMany?: NoticeUpdateManyWithWhereWithoutEproceedingInput | NoticeUpdateManyWithWhereWithoutEproceedingInput[]
    deleteMany?: NoticeScalarWhereInput | NoticeScalarWhereInput[]
  }

  export type NoticeUncheckedUpdateManyWithoutEproceedingNestedInput = {
    create?: XOR<NoticeCreateWithoutEproceedingInput, NoticeUncheckedCreateWithoutEproceedingInput> | NoticeCreateWithoutEproceedingInput[] | NoticeUncheckedCreateWithoutEproceedingInput[]
    connectOrCreate?: NoticeCreateOrConnectWithoutEproceedingInput | NoticeCreateOrConnectWithoutEproceedingInput[]
    upsert?: NoticeUpsertWithWhereUniqueWithoutEproceedingInput | NoticeUpsertWithWhereUniqueWithoutEproceedingInput[]
    createMany?: NoticeCreateManyEproceedingInputEnvelope
    set?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    disconnect?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    delete?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    connect?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    update?: NoticeUpdateWithWhereUniqueWithoutEproceedingInput | NoticeUpdateWithWhereUniqueWithoutEproceedingInput[]
    updateMany?: NoticeUpdateManyWithWhereWithoutEproceedingInput | NoticeUpdateManyWithWhereWithoutEproceedingInput[]
    deleteMany?: NoticeScalarWhereInput | NoticeScalarWhereInput[]
  }

  export type EProceedingCreateNestedOneWithoutNoticesInput = {
    create?: XOR<EProceedingCreateWithoutNoticesInput, EProceedingUncheckedCreateWithoutNoticesInput>
    connectOrCreate?: EProceedingCreateOrConnectWithoutNoticesInput
    connect?: EProceedingWhereUniqueInput
  }

  export type ResponseCreateNestedManyWithoutNoticeInput = {
    create?: XOR<ResponseCreateWithoutNoticeInput, ResponseUncheckedCreateWithoutNoticeInput> | ResponseCreateWithoutNoticeInput[] | ResponseUncheckedCreateWithoutNoticeInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutNoticeInput | ResponseCreateOrConnectWithoutNoticeInput[]
    createMany?: ResponseCreateManyNoticeInputEnvelope
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
  }

  export type DocumentCreateNestedManyWithoutNoticeInput = {
    create?: XOR<DocumentCreateWithoutNoticeInput, DocumentUncheckedCreateWithoutNoticeInput> | DocumentCreateWithoutNoticeInput[] | DocumentUncheckedCreateWithoutNoticeInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutNoticeInput | DocumentCreateOrConnectWithoutNoticeInput[]
    createMany?: DocumentCreateManyNoticeInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type ResponseUncheckedCreateNestedManyWithoutNoticeInput = {
    create?: XOR<ResponseCreateWithoutNoticeInput, ResponseUncheckedCreateWithoutNoticeInput> | ResponseCreateWithoutNoticeInput[] | ResponseUncheckedCreateWithoutNoticeInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutNoticeInput | ResponseCreateOrConnectWithoutNoticeInput[]
    createMany?: ResponseCreateManyNoticeInputEnvelope
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutNoticeInput = {
    create?: XOR<DocumentCreateWithoutNoticeInput, DocumentUncheckedCreateWithoutNoticeInput> | DocumentCreateWithoutNoticeInput[] | DocumentUncheckedCreateWithoutNoticeInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutNoticeInput | DocumentCreateOrConnectWithoutNoticeInput[]
    createMany?: DocumentCreateManyNoticeInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
    unset?: boolean
  }

  export type EProceedingUpdateOneRequiredWithoutNoticesNestedInput = {
    create?: XOR<EProceedingCreateWithoutNoticesInput, EProceedingUncheckedCreateWithoutNoticesInput>
    connectOrCreate?: EProceedingCreateOrConnectWithoutNoticesInput
    upsert?: EProceedingUpsertWithoutNoticesInput
    connect?: EProceedingWhereUniqueInput
    update?: XOR<XOR<EProceedingUpdateToOneWithWhereWithoutNoticesInput, EProceedingUpdateWithoutNoticesInput>, EProceedingUncheckedUpdateWithoutNoticesInput>
  }

  export type ResponseUpdateManyWithoutNoticeNestedInput = {
    create?: XOR<ResponseCreateWithoutNoticeInput, ResponseUncheckedCreateWithoutNoticeInput> | ResponseCreateWithoutNoticeInput[] | ResponseUncheckedCreateWithoutNoticeInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutNoticeInput | ResponseCreateOrConnectWithoutNoticeInput[]
    upsert?: ResponseUpsertWithWhereUniqueWithoutNoticeInput | ResponseUpsertWithWhereUniqueWithoutNoticeInput[]
    createMany?: ResponseCreateManyNoticeInputEnvelope
    set?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    disconnect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    delete?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    update?: ResponseUpdateWithWhereUniqueWithoutNoticeInput | ResponseUpdateWithWhereUniqueWithoutNoticeInput[]
    updateMany?: ResponseUpdateManyWithWhereWithoutNoticeInput | ResponseUpdateManyWithWhereWithoutNoticeInput[]
    deleteMany?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
  }

  export type DocumentUpdateManyWithoutNoticeNestedInput = {
    create?: XOR<DocumentCreateWithoutNoticeInput, DocumentUncheckedCreateWithoutNoticeInput> | DocumentCreateWithoutNoticeInput[] | DocumentUncheckedCreateWithoutNoticeInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutNoticeInput | DocumentCreateOrConnectWithoutNoticeInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutNoticeInput | DocumentUpsertWithWhereUniqueWithoutNoticeInput[]
    createMany?: DocumentCreateManyNoticeInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutNoticeInput | DocumentUpdateWithWhereUniqueWithoutNoticeInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutNoticeInput | DocumentUpdateManyWithWhereWithoutNoticeInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type ResponseUncheckedUpdateManyWithoutNoticeNestedInput = {
    create?: XOR<ResponseCreateWithoutNoticeInput, ResponseUncheckedCreateWithoutNoticeInput> | ResponseCreateWithoutNoticeInput[] | ResponseUncheckedCreateWithoutNoticeInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutNoticeInput | ResponseCreateOrConnectWithoutNoticeInput[]
    upsert?: ResponseUpsertWithWhereUniqueWithoutNoticeInput | ResponseUpsertWithWhereUniqueWithoutNoticeInput[]
    createMany?: ResponseCreateManyNoticeInputEnvelope
    set?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    disconnect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    delete?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    update?: ResponseUpdateWithWhereUniqueWithoutNoticeInput | ResponseUpdateWithWhereUniqueWithoutNoticeInput[]
    updateMany?: ResponseUpdateManyWithWhereWithoutNoticeInput | ResponseUpdateManyWithWhereWithoutNoticeInput[]
    deleteMany?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutNoticeNestedInput = {
    create?: XOR<DocumentCreateWithoutNoticeInput, DocumentUncheckedCreateWithoutNoticeInput> | DocumentCreateWithoutNoticeInput[] | DocumentUncheckedCreateWithoutNoticeInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutNoticeInput | DocumentCreateOrConnectWithoutNoticeInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutNoticeInput | DocumentUpsertWithWhereUniqueWithoutNoticeInput[]
    createMany?: DocumentCreateManyNoticeInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutNoticeInput | DocumentUpdateWithWhereUniqueWithoutNoticeInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutNoticeInput | DocumentUpdateManyWithWhereWithoutNoticeInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type NoticeCreateNestedOneWithoutResponsesInput = {
    create?: XOR<NoticeCreateWithoutResponsesInput, NoticeUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: NoticeCreateOrConnectWithoutResponsesInput
    connect?: NoticeWhereUniqueInput
  }

  export type DocumentCreateNestedManyWithoutResponseInput = {
    create?: XOR<DocumentCreateWithoutResponseInput, DocumentUncheckedCreateWithoutResponseInput> | DocumentCreateWithoutResponseInput[] | DocumentUncheckedCreateWithoutResponseInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutResponseInput | DocumentCreateOrConnectWithoutResponseInput[]
    createMany?: DocumentCreateManyResponseInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutResponseInput = {
    create?: XOR<DocumentCreateWithoutResponseInput, DocumentUncheckedCreateWithoutResponseInput> | DocumentCreateWithoutResponseInput[] | DocumentUncheckedCreateWithoutResponseInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutResponseInput | DocumentCreateOrConnectWithoutResponseInput[]
    createMany?: DocumentCreateManyResponseInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type NoticeUpdateOneRequiredWithoutResponsesNestedInput = {
    create?: XOR<NoticeCreateWithoutResponsesInput, NoticeUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: NoticeCreateOrConnectWithoutResponsesInput
    upsert?: NoticeUpsertWithoutResponsesInput
    connect?: NoticeWhereUniqueInput
    update?: XOR<XOR<NoticeUpdateToOneWithWhereWithoutResponsesInput, NoticeUpdateWithoutResponsesInput>, NoticeUncheckedUpdateWithoutResponsesInput>
  }

  export type DocumentUpdateManyWithoutResponseNestedInput = {
    create?: XOR<DocumentCreateWithoutResponseInput, DocumentUncheckedCreateWithoutResponseInput> | DocumentCreateWithoutResponseInput[] | DocumentUncheckedCreateWithoutResponseInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutResponseInput | DocumentCreateOrConnectWithoutResponseInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutResponseInput | DocumentUpsertWithWhereUniqueWithoutResponseInput[]
    createMany?: DocumentCreateManyResponseInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutResponseInput | DocumentUpdateWithWhereUniqueWithoutResponseInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutResponseInput | DocumentUpdateManyWithWhereWithoutResponseInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutResponseNestedInput = {
    create?: XOR<DocumentCreateWithoutResponseInput, DocumentUncheckedCreateWithoutResponseInput> | DocumentCreateWithoutResponseInput[] | DocumentUncheckedCreateWithoutResponseInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutResponseInput | DocumentCreateOrConnectWithoutResponseInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutResponseInput | DocumentUpsertWithWhereUniqueWithoutResponseInput[]
    createMany?: DocumentCreateManyResponseInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutResponseInput | DocumentUpdateWithWhereUniqueWithoutResponseInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutResponseInput | DocumentUpdateManyWithWhereWithoutResponseInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type NoticeCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<NoticeCreateWithoutDocumentsInput, NoticeUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: NoticeCreateOrConnectWithoutDocumentsInput
    connect?: NoticeWhereUniqueInput
  }

  export type ResponseCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<ResponseCreateWithoutDocumentsInput, ResponseUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: ResponseCreateOrConnectWithoutDocumentsInput
    connect?: ResponseWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NoticeUpdateOneWithoutDocumentsNestedInput = {
    create?: XOR<NoticeCreateWithoutDocumentsInput, NoticeUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: NoticeCreateOrConnectWithoutDocumentsInput
    upsert?: NoticeUpsertWithoutDocumentsInput
    disconnect?: boolean
    delete?: NoticeWhereInput | boolean
    connect?: NoticeWhereUniqueInput
    update?: XOR<XOR<NoticeUpdateToOneWithWhereWithoutDocumentsInput, NoticeUpdateWithoutDocumentsInput>, NoticeUncheckedUpdateWithoutDocumentsInput>
  }

  export type ResponseUpdateOneWithoutDocumentsNestedInput = {
    create?: XOR<ResponseCreateWithoutDocumentsInput, ResponseUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: ResponseCreateOrConnectWithoutDocumentsInput
    upsert?: ResponseUpsertWithoutDocumentsInput
    disconnect?: boolean
    delete?: ResponseWhereInput | boolean
    connect?: ResponseWhereUniqueInput
    update?: XOR<XOR<ResponseUpdateToOneWithWhereWithoutDocumentsInput, ResponseUpdateWithoutDocumentsInput>, ResponseUncheckedUpdateWithoutDocumentsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
    isSet?: boolean
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EProceedingCreateWithoutAssesseeInput = {
    id?: string
    type?: string | null
    ay?: number | null
    notices?: NoticeCreateNestedManyWithoutEproceedingInput
  }

  export type EProceedingUncheckedCreateWithoutAssesseeInput = {
    id?: string
    type?: string | null
    ay?: number | null
    notices?: NoticeUncheckedCreateNestedManyWithoutEproceedingInput
  }

  export type EProceedingCreateOrConnectWithoutAssesseeInput = {
    where: EProceedingWhereUniqueInput
    create: XOR<EProceedingCreateWithoutAssesseeInput, EProceedingUncheckedCreateWithoutAssesseeInput>
  }

  export type EProceedingCreateManyAssesseeInputEnvelope = {
    data: EProceedingCreateManyAssesseeInput | EProceedingCreateManyAssesseeInput[]
  }

  export type EProceedingUpsertWithWhereUniqueWithoutAssesseeInput = {
    where: EProceedingWhereUniqueInput
    update: XOR<EProceedingUpdateWithoutAssesseeInput, EProceedingUncheckedUpdateWithoutAssesseeInput>
    create: XOR<EProceedingCreateWithoutAssesseeInput, EProceedingUncheckedCreateWithoutAssesseeInput>
  }

  export type EProceedingUpdateWithWhereUniqueWithoutAssesseeInput = {
    where: EProceedingWhereUniqueInput
    data: XOR<EProceedingUpdateWithoutAssesseeInput, EProceedingUncheckedUpdateWithoutAssesseeInput>
  }

  export type EProceedingUpdateManyWithWhereWithoutAssesseeInput = {
    where: EProceedingScalarWhereInput
    data: XOR<EProceedingUpdateManyMutationInput, EProceedingUncheckedUpdateManyWithoutAssesseeInput>
  }

  export type EProceedingScalarWhereInput = {
    AND?: EProceedingScalarWhereInput | EProceedingScalarWhereInput[]
    OR?: EProceedingScalarWhereInput[]
    NOT?: EProceedingScalarWhereInput | EProceedingScalarWhereInput[]
    id?: StringFilter<"EProceeding"> | string
    type?: StringNullableFilter<"EProceeding"> | string | null
    ay?: IntNullableFilter<"EProceeding"> | number | null
    assesseeId?: StringFilter<"EProceeding"> | string
  }

  export type AssesseeCreateWithoutEproceedingsInput = {
    id?: string
    pan: string
    name?: string | null
    lastSyncedOn?: Date | string | null
  }

  export type AssesseeUncheckedCreateWithoutEproceedingsInput = {
    id?: string
    pan: string
    name?: string | null
    lastSyncedOn?: Date | string | null
  }

  export type AssesseeCreateOrConnectWithoutEproceedingsInput = {
    where: AssesseeWhereUniqueInput
    create: XOR<AssesseeCreateWithoutEproceedingsInput, AssesseeUncheckedCreateWithoutEproceedingsInput>
  }

  export type NoticeCreateWithoutEproceedingInput = {
    id?: string
    noticeId: string
    section?: string | null
    noticeType?: string | null
    noticeDate?: Date | string | null
    dueDate?: Date | string | null
    noticePdfDocId?: bigint | number | null
    responses?: ResponseCreateNestedManyWithoutNoticeInput
    documents?: DocumentCreateNestedManyWithoutNoticeInput
  }

  export type NoticeUncheckedCreateWithoutEproceedingInput = {
    id?: string
    noticeId: string
    section?: string | null
    noticeType?: string | null
    noticeDate?: Date | string | null
    dueDate?: Date | string | null
    noticePdfDocId?: bigint | number | null
    responses?: ResponseUncheckedCreateNestedManyWithoutNoticeInput
    documents?: DocumentUncheckedCreateNestedManyWithoutNoticeInput
  }

  export type NoticeCreateOrConnectWithoutEproceedingInput = {
    where: NoticeWhereUniqueInput
    create: XOR<NoticeCreateWithoutEproceedingInput, NoticeUncheckedCreateWithoutEproceedingInput>
  }

  export type NoticeCreateManyEproceedingInputEnvelope = {
    data: NoticeCreateManyEproceedingInput | NoticeCreateManyEproceedingInput[]
  }

  export type AssesseeUpsertWithoutEproceedingsInput = {
    update: XOR<AssesseeUpdateWithoutEproceedingsInput, AssesseeUncheckedUpdateWithoutEproceedingsInput>
    create: XOR<AssesseeCreateWithoutEproceedingsInput, AssesseeUncheckedCreateWithoutEproceedingsInput>
    where?: AssesseeWhereInput
  }

  export type AssesseeUpdateToOneWithWhereWithoutEproceedingsInput = {
    where?: AssesseeWhereInput
    data: XOR<AssesseeUpdateWithoutEproceedingsInput, AssesseeUncheckedUpdateWithoutEproceedingsInput>
  }

  export type AssesseeUpdateWithoutEproceedingsInput = {
    pan?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedOn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AssesseeUncheckedUpdateWithoutEproceedingsInput = {
    pan?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedOn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NoticeUpsertWithWhereUniqueWithoutEproceedingInput = {
    where: NoticeWhereUniqueInput
    update: XOR<NoticeUpdateWithoutEproceedingInput, NoticeUncheckedUpdateWithoutEproceedingInput>
    create: XOR<NoticeCreateWithoutEproceedingInput, NoticeUncheckedCreateWithoutEproceedingInput>
  }

  export type NoticeUpdateWithWhereUniqueWithoutEproceedingInput = {
    where: NoticeWhereUniqueInput
    data: XOR<NoticeUpdateWithoutEproceedingInput, NoticeUncheckedUpdateWithoutEproceedingInput>
  }

  export type NoticeUpdateManyWithWhereWithoutEproceedingInput = {
    where: NoticeScalarWhereInput
    data: XOR<NoticeUpdateManyMutationInput, NoticeUncheckedUpdateManyWithoutEproceedingInput>
  }

  export type NoticeScalarWhereInput = {
    AND?: NoticeScalarWhereInput | NoticeScalarWhereInput[]
    OR?: NoticeScalarWhereInput[]
    NOT?: NoticeScalarWhereInput | NoticeScalarWhereInput[]
    id?: StringFilter<"Notice"> | string
    noticeId?: StringFilter<"Notice"> | string
    section?: StringNullableFilter<"Notice"> | string | null
    noticeType?: StringNullableFilter<"Notice"> | string | null
    noticeDate?: DateTimeNullableFilter<"Notice"> | Date | string | null
    dueDate?: DateTimeNullableFilter<"Notice"> | Date | string | null
    noticePdfDocId?: BigIntNullableFilter<"Notice"> | bigint | number | null
    eproceedingId?: StringFilter<"Notice"> | string
  }

  export type EProceedingCreateWithoutNoticesInput = {
    id?: string
    type?: string | null
    ay?: number | null
    assessee: AssesseeCreateNestedOneWithoutEproceedingsInput
  }

  export type EProceedingUncheckedCreateWithoutNoticesInput = {
    id?: string
    type?: string | null
    ay?: number | null
    assesseeId: string
  }

  export type EProceedingCreateOrConnectWithoutNoticesInput = {
    where: EProceedingWhereUniqueInput
    create: XOR<EProceedingCreateWithoutNoticesInput, EProceedingUncheckedCreateWithoutNoticesInput>
  }

  export type ResponseCreateWithoutNoticeInput = {
    id?: string
    status?: string | null
    responseDate?: Date | string | null
    remarks?: string | null
    documents?: DocumentCreateNestedManyWithoutResponseInput
  }

  export type ResponseUncheckedCreateWithoutNoticeInput = {
    id?: string
    status?: string | null
    responseDate?: Date | string | null
    remarks?: string | null
    documents?: DocumentUncheckedCreateNestedManyWithoutResponseInput
  }

  export type ResponseCreateOrConnectWithoutNoticeInput = {
    where: ResponseWhereUniqueInput
    create: XOR<ResponseCreateWithoutNoticeInput, ResponseUncheckedCreateWithoutNoticeInput>
  }

  export type ResponseCreateManyNoticeInputEnvelope = {
    data: ResponseCreateManyNoticeInput | ResponseCreateManyNoticeInput[]
  }

  export type DocumentCreateWithoutNoticeInput = {
    id?: string
    docId: bigint | number
    name?: string | null
    contentType?: string | null
    category?: string | null
    size?: string | null
    response?: ResponseCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateWithoutNoticeInput = {
    id?: string
    docId: bigint | number
    name?: string | null
    contentType?: string | null
    category?: string | null
    size?: string | null
    responseId?: string | null
  }

  export type DocumentCreateOrConnectWithoutNoticeInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutNoticeInput, DocumentUncheckedCreateWithoutNoticeInput>
  }

  export type DocumentCreateManyNoticeInputEnvelope = {
    data: DocumentCreateManyNoticeInput | DocumentCreateManyNoticeInput[]
  }

  export type EProceedingUpsertWithoutNoticesInput = {
    update: XOR<EProceedingUpdateWithoutNoticesInput, EProceedingUncheckedUpdateWithoutNoticesInput>
    create: XOR<EProceedingCreateWithoutNoticesInput, EProceedingUncheckedCreateWithoutNoticesInput>
    where?: EProceedingWhereInput
  }

  export type EProceedingUpdateToOneWithWhereWithoutNoticesInput = {
    where?: EProceedingWhereInput
    data: XOR<EProceedingUpdateWithoutNoticesInput, EProceedingUncheckedUpdateWithoutNoticesInput>
  }

  export type EProceedingUpdateWithoutNoticesInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    ay?: NullableIntFieldUpdateOperationsInput | number | null
    assessee?: AssesseeUpdateOneRequiredWithoutEproceedingsNestedInput
  }

  export type EProceedingUncheckedUpdateWithoutNoticesInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    ay?: NullableIntFieldUpdateOperationsInput | number | null
    assesseeId?: StringFieldUpdateOperationsInput | string
  }

  export type ResponseUpsertWithWhereUniqueWithoutNoticeInput = {
    where: ResponseWhereUniqueInput
    update: XOR<ResponseUpdateWithoutNoticeInput, ResponseUncheckedUpdateWithoutNoticeInput>
    create: XOR<ResponseCreateWithoutNoticeInput, ResponseUncheckedCreateWithoutNoticeInput>
  }

  export type ResponseUpdateWithWhereUniqueWithoutNoticeInput = {
    where: ResponseWhereUniqueInput
    data: XOR<ResponseUpdateWithoutNoticeInput, ResponseUncheckedUpdateWithoutNoticeInput>
  }

  export type ResponseUpdateManyWithWhereWithoutNoticeInput = {
    where: ResponseScalarWhereInput
    data: XOR<ResponseUpdateManyMutationInput, ResponseUncheckedUpdateManyWithoutNoticeInput>
  }

  export type ResponseScalarWhereInput = {
    AND?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
    OR?: ResponseScalarWhereInput[]
    NOT?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
    id?: StringFilter<"Response"> | string
    status?: StringNullableFilter<"Response"> | string | null
    responseDate?: DateTimeNullableFilter<"Response"> | Date | string | null
    remarks?: StringNullableFilter<"Response"> | string | null
    noticeId?: StringFilter<"Response"> | string
  }

  export type DocumentUpsertWithWhereUniqueWithoutNoticeInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutNoticeInput, DocumentUncheckedUpdateWithoutNoticeInput>
    create: XOR<DocumentCreateWithoutNoticeInput, DocumentUncheckedCreateWithoutNoticeInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutNoticeInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutNoticeInput, DocumentUncheckedUpdateWithoutNoticeInput>
  }

  export type DocumentUpdateManyWithWhereWithoutNoticeInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutNoticeInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: StringFilter<"Document"> | string
    docId?: BigIntFilter<"Document"> | bigint | number
    name?: StringNullableFilter<"Document"> | string | null
    contentType?: StringNullableFilter<"Document"> | string | null
    category?: StringNullableFilter<"Document"> | string | null
    size?: StringNullableFilter<"Document"> | string | null
    noticeId?: StringNullableFilter<"Document"> | string | null
    responseId?: StringNullableFilter<"Document"> | string | null
  }

  export type NoticeCreateWithoutResponsesInput = {
    id?: string
    noticeId: string
    section?: string | null
    noticeType?: string | null
    noticeDate?: Date | string | null
    dueDate?: Date | string | null
    noticePdfDocId?: bigint | number | null
    eproceeding: EProceedingCreateNestedOneWithoutNoticesInput
    documents?: DocumentCreateNestedManyWithoutNoticeInput
  }

  export type NoticeUncheckedCreateWithoutResponsesInput = {
    id?: string
    noticeId: string
    section?: string | null
    noticeType?: string | null
    noticeDate?: Date | string | null
    dueDate?: Date | string | null
    noticePdfDocId?: bigint | number | null
    eproceedingId: string
    documents?: DocumentUncheckedCreateNestedManyWithoutNoticeInput
  }

  export type NoticeCreateOrConnectWithoutResponsesInput = {
    where: NoticeWhereUniqueInput
    create: XOR<NoticeCreateWithoutResponsesInput, NoticeUncheckedCreateWithoutResponsesInput>
  }

  export type DocumentCreateWithoutResponseInput = {
    id?: string
    docId: bigint | number
    name?: string | null
    contentType?: string | null
    category?: string | null
    size?: string | null
    notice?: NoticeCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateWithoutResponseInput = {
    id?: string
    docId: bigint | number
    name?: string | null
    contentType?: string | null
    category?: string | null
    size?: string | null
    noticeId?: string | null
  }

  export type DocumentCreateOrConnectWithoutResponseInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutResponseInput, DocumentUncheckedCreateWithoutResponseInput>
  }

  export type DocumentCreateManyResponseInputEnvelope = {
    data: DocumentCreateManyResponseInput | DocumentCreateManyResponseInput[]
  }

  export type NoticeUpsertWithoutResponsesInput = {
    update: XOR<NoticeUpdateWithoutResponsesInput, NoticeUncheckedUpdateWithoutResponsesInput>
    create: XOR<NoticeCreateWithoutResponsesInput, NoticeUncheckedCreateWithoutResponsesInput>
    where?: NoticeWhereInput
  }

  export type NoticeUpdateToOneWithWhereWithoutResponsesInput = {
    where?: NoticeWhereInput
    data: XOR<NoticeUpdateWithoutResponsesInput, NoticeUncheckedUpdateWithoutResponsesInput>
  }

  export type NoticeUpdateWithoutResponsesInput = {
    noticeId?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    noticeType?: NullableStringFieldUpdateOperationsInput | string | null
    noticeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noticePdfDocId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    eproceeding?: EProceedingUpdateOneRequiredWithoutNoticesNestedInput
    documents?: DocumentUpdateManyWithoutNoticeNestedInput
  }

  export type NoticeUncheckedUpdateWithoutResponsesInput = {
    noticeId?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    noticeType?: NullableStringFieldUpdateOperationsInput | string | null
    noticeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noticePdfDocId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    eproceedingId?: StringFieldUpdateOperationsInput | string
    documents?: DocumentUncheckedUpdateManyWithoutNoticeNestedInput
  }

  export type DocumentUpsertWithWhereUniqueWithoutResponseInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutResponseInput, DocumentUncheckedUpdateWithoutResponseInput>
    create: XOR<DocumentCreateWithoutResponseInput, DocumentUncheckedCreateWithoutResponseInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutResponseInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutResponseInput, DocumentUncheckedUpdateWithoutResponseInput>
  }

  export type DocumentUpdateManyWithWhereWithoutResponseInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutResponseInput>
  }

  export type NoticeCreateWithoutDocumentsInput = {
    id?: string
    noticeId: string
    section?: string | null
    noticeType?: string | null
    noticeDate?: Date | string | null
    dueDate?: Date | string | null
    noticePdfDocId?: bigint | number | null
    eproceeding: EProceedingCreateNestedOneWithoutNoticesInput
    responses?: ResponseCreateNestedManyWithoutNoticeInput
  }

  export type NoticeUncheckedCreateWithoutDocumentsInput = {
    id?: string
    noticeId: string
    section?: string | null
    noticeType?: string | null
    noticeDate?: Date | string | null
    dueDate?: Date | string | null
    noticePdfDocId?: bigint | number | null
    eproceedingId: string
    responses?: ResponseUncheckedCreateNestedManyWithoutNoticeInput
  }

  export type NoticeCreateOrConnectWithoutDocumentsInput = {
    where: NoticeWhereUniqueInput
    create: XOR<NoticeCreateWithoutDocumentsInput, NoticeUncheckedCreateWithoutDocumentsInput>
  }

  export type ResponseCreateWithoutDocumentsInput = {
    id?: string
    status?: string | null
    responseDate?: Date | string | null
    remarks?: string | null
    notice: NoticeCreateNestedOneWithoutResponsesInput
  }

  export type ResponseUncheckedCreateWithoutDocumentsInput = {
    id?: string
    status?: string | null
    responseDate?: Date | string | null
    remarks?: string | null
    noticeId: string
  }

  export type ResponseCreateOrConnectWithoutDocumentsInput = {
    where: ResponseWhereUniqueInput
    create: XOR<ResponseCreateWithoutDocumentsInput, ResponseUncheckedCreateWithoutDocumentsInput>
  }

  export type NoticeUpsertWithoutDocumentsInput = {
    update: XOR<NoticeUpdateWithoutDocumentsInput, NoticeUncheckedUpdateWithoutDocumentsInput>
    create: XOR<NoticeCreateWithoutDocumentsInput, NoticeUncheckedCreateWithoutDocumentsInput>
    where?: NoticeWhereInput
  }

  export type NoticeUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: NoticeWhereInput
    data: XOR<NoticeUpdateWithoutDocumentsInput, NoticeUncheckedUpdateWithoutDocumentsInput>
  }

  export type NoticeUpdateWithoutDocumentsInput = {
    noticeId?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    noticeType?: NullableStringFieldUpdateOperationsInput | string | null
    noticeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noticePdfDocId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    eproceeding?: EProceedingUpdateOneRequiredWithoutNoticesNestedInput
    responses?: ResponseUpdateManyWithoutNoticeNestedInput
  }

  export type NoticeUncheckedUpdateWithoutDocumentsInput = {
    noticeId?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    noticeType?: NullableStringFieldUpdateOperationsInput | string | null
    noticeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noticePdfDocId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    eproceedingId?: StringFieldUpdateOperationsInput | string
    responses?: ResponseUncheckedUpdateManyWithoutNoticeNestedInput
  }

  export type ResponseUpsertWithoutDocumentsInput = {
    update: XOR<ResponseUpdateWithoutDocumentsInput, ResponseUncheckedUpdateWithoutDocumentsInput>
    create: XOR<ResponseCreateWithoutDocumentsInput, ResponseUncheckedCreateWithoutDocumentsInput>
    where?: ResponseWhereInput
  }

  export type ResponseUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: ResponseWhereInput
    data: XOR<ResponseUpdateWithoutDocumentsInput, ResponseUncheckedUpdateWithoutDocumentsInput>
  }

  export type ResponseUpdateWithoutDocumentsInput = {
    status?: NullableStringFieldUpdateOperationsInput | string | null
    responseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    notice?: NoticeUpdateOneRequiredWithoutResponsesNestedInput
  }

  export type ResponseUncheckedUpdateWithoutDocumentsInput = {
    status?: NullableStringFieldUpdateOperationsInput | string | null
    responseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    noticeId?: StringFieldUpdateOperationsInput | string
  }

  export type EProceedingCreateManyAssesseeInput = {
    id?: string
    type?: string | null
    ay?: number | null
  }

  export type EProceedingUpdateWithoutAssesseeInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    ay?: NullableIntFieldUpdateOperationsInput | number | null
    notices?: NoticeUpdateManyWithoutEproceedingNestedInput
  }

  export type EProceedingUncheckedUpdateWithoutAssesseeInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    ay?: NullableIntFieldUpdateOperationsInput | number | null
    notices?: NoticeUncheckedUpdateManyWithoutEproceedingNestedInput
  }

  export type EProceedingUncheckedUpdateManyWithoutAssesseeInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    ay?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type NoticeCreateManyEproceedingInput = {
    id?: string
    noticeId: string
    section?: string | null
    noticeType?: string | null
    noticeDate?: Date | string | null
    dueDate?: Date | string | null
    noticePdfDocId?: bigint | number | null
  }

  export type NoticeUpdateWithoutEproceedingInput = {
    noticeId?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    noticeType?: NullableStringFieldUpdateOperationsInput | string | null
    noticeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noticePdfDocId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    responses?: ResponseUpdateManyWithoutNoticeNestedInput
    documents?: DocumentUpdateManyWithoutNoticeNestedInput
  }

  export type NoticeUncheckedUpdateWithoutEproceedingInput = {
    noticeId?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    noticeType?: NullableStringFieldUpdateOperationsInput | string | null
    noticeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noticePdfDocId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    responses?: ResponseUncheckedUpdateManyWithoutNoticeNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutNoticeNestedInput
  }

  export type NoticeUncheckedUpdateManyWithoutEproceedingInput = {
    noticeId?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    noticeType?: NullableStringFieldUpdateOperationsInput | string | null
    noticeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noticePdfDocId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type ResponseCreateManyNoticeInput = {
    id?: string
    status?: string | null
    responseDate?: Date | string | null
    remarks?: string | null
  }

  export type DocumentCreateManyNoticeInput = {
    id?: string
    docId: bigint | number
    name?: string | null
    contentType?: string | null
    category?: string | null
    size?: string | null
    responseId?: string | null
  }

  export type ResponseUpdateWithoutNoticeInput = {
    status?: NullableStringFieldUpdateOperationsInput | string | null
    responseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: DocumentUpdateManyWithoutResponseNestedInput
  }

  export type ResponseUncheckedUpdateWithoutNoticeInput = {
    status?: NullableStringFieldUpdateOperationsInput | string | null
    responseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: DocumentUncheckedUpdateManyWithoutResponseNestedInput
  }

  export type ResponseUncheckedUpdateManyWithoutNoticeInput = {
    status?: NullableStringFieldUpdateOperationsInput | string | null
    responseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentUpdateWithoutNoticeInput = {
    docId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    response?: ResponseUpdateOneWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateWithoutNoticeInput = {
    docId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    responseId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentUncheckedUpdateManyWithoutNoticeInput = {
    docId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    responseId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentCreateManyResponseInput = {
    id?: string
    docId: bigint | number
    name?: string | null
    contentType?: string | null
    category?: string | null
    size?: string | null
    noticeId?: string | null
  }

  export type DocumentUpdateWithoutResponseInput = {
    docId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    notice?: NoticeUpdateOneWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateWithoutResponseInput = {
    docId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    noticeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentUncheckedUpdateManyWithoutResponseInput = {
    docId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    noticeId?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}