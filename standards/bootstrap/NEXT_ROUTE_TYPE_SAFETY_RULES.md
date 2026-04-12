# NEXT_ROUTE_TYPE_SAFETY_RULES

## 目的
App Router の route typing 地雷で build を壊さないようにします。

## ハードルール
- implicit `any` を使わない
- `RouteContext` に依存しない
- generated helper type を前提にしない
- supported export のみを route file に置く

## dynamic route params
dynamic route handler は次の形を baseline とする。

```ts
type TodoRouteContext = { params: Promise<{ id: string }> };

export async function PATCH(
  request: Request,
  { params }: TodoRouteContext,
) {
  const { id } = await params;
}
```

旧式の次は baseline で使わない。

```ts
{ params: { id: string } }
```

## `pg` と rowCount
`pg` の `rowCount` は null の可能性を考慮する。

- 比較時は `(result.rowCount ?? 0) > 0`
- 常に number と決め打ちしない

## query helper
`lib/db.ts` の generic query helper は次の形を使う。

```ts
export async function query<T extends QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<QueryResult<T>>
```

## exports
route file には必要なものだけ置く。

- `runtime`
- `dynamic`（必要時）
- HTTP handlers

余計な helper や config を route file に持ち込みすぎない。
