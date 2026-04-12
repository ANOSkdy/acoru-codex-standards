# PROCESS_RULES

## 目的
このPJの主要業務フローを state machine として記録します。  
実装前の判断材料と、失敗時の復旧判断の基盤になります。

## Process format
各 process について次を定義する。

- name
- trigger
- input
- preconditions
- states
- transitions
- success / failure
- retry / timeout
- cancel
- audit / events

---

## Example: generation request lifecycle

### Name
`generation_request_lifecycle`

### Trigger
user submits request form

### Input
- title
- audience_type
- content_type
- optional settings

### Preconditions
- actor authenticated
- actor can create request
- required inputs validated
- enum values normalized

### States
- `queued`
- `running`
- `succeeded`
- `failed`
- `canceled`

### Transitions
- queued → running
- running → succeeded
- running → failed
- queued/running → canceled
- failed → queued (retry policy only)

### Success
- final deck generated
- request marked succeeded
- job finished_at set

### Failure
- request marked failed
- error summary recorded
- retryability known

### Retry / timeout
- max retry: `<N>`
- timeout: `<duration>`
- backoff: `<policy>`

### Cancel
- allowed in: queued, running
- effect: no further processing, preserve history

### Audit / events
- request created
- job started
- job failed
- job succeeded
- request canceled

## Project processes
この形式で主要 process を追記する。
