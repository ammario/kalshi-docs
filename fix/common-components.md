---
url: https://docs.kalshi.com/fix/common-components
lastmod: 2026-05-12T23:42:08.193Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Common Components

> Standard header, trailer, and shared components across all FIX messages

Kalshi's FIX implementation uses **FIXT.1.1** with application version **FIX50SP2**. Members on the Premier tier or above have FIX access by default. For all other tiers, contact [institutional@kalshi.com](mailto:institutional@kalshi.com) to inquire about access.

## FIX Dictionary

Download the Kalshi-specific FIX dictionary for import into your FIX engine:

* [Kalshi FIX Dictionary (XML)](https://kalshi-public-docs.s3.us-east-1.amazonaws.com/fix/kalshi-fix-dictionary.xml)

<Note>
  If you are using a FIX engine such as [QuickFIX/J](https://www.quickfixj.org/), [QuickFIX/N](https://quickfixn.readthedocs.io/), or [quickfix-go](https://github.com/quickfixgo/quickfix), the standard header and trailer fields below are managed automatically by the library. This section is primarily a reference for custom implementations or debugging.
</Note>

## Standard Header

Every FIX message begins with the following fields:

| Tag | Name            | Type         | Required | Description                                                                                                                                                         |
| --- | --------------- | ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 8   | BeginString     | String       | Y        | Always `FIXT.1.1`                                                                                                                                                   |
| 9   | BodyLength      | Int          | Y        | Message length in bytes, from the tag after BodyLength up to (but not including) the CheckSum field. Must be the second field.                                      |
| 35  | MsgType         | String       | Y        | Identifies the message type. Must be the third field.                                                                                                               |
| 49  | SenderCompID    | String       | Y        | Your FIX API Key (UUID format) when sending; `Kalshi` when receiving.                                                                                               |
| 56  | TargetCompID    | String       | Y        | Session identifier (e.g. `KalshiRT`, `KalshiNR`) when sending; your API key when receiving.                                                                         |
| 34  | MsgSeqNum       | Int          | Y        | Monotonically increasing sequence number, starting at 1.                                                                                                            |
| 52  | SendingTime     | UTCTimestamp | Y        | Time the message was sent, in UTC. Format: `YYYYMMDD-HH:MM:SS.mmm`. Must be within 30 seconds of server time or the message is rejected (`SessionRejectReason=10`). |
| 43  | PossDupFlag     | Boolean      | N        | `Y` if the message is a possible duplicate of a previously sent message (used during retransmission).                                                               |
| 97  | PossResend      | Boolean      | N        | `Y` if the message may contain information that has already been sent under a different sequence number.                                                            |
| 122 | OrigSendingTime | UTCTimestamp | N        | Original SendingTime of a message being resent. Required when `PossDupFlag=Y`.                                                                                      |

## Standard Trailer

Every FIX message ends with:

| Tag | Name     | Type   | Required | Description                                                                                                                                                                                    |
| --- | -------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 10  | CheckSum | String | Y        | Three-character checksum. Calculated by summing every byte in the message up to (but not including) the CheckSum field, then taking modulo 256. Always three digits, zero-padded (e.g. `007`). |

## Supported MsgTypes

### Session-Level (all sessions)

| MsgType | Name          | Direction                      |
| ------- | ------------- | ------------------------------ |
| A       | Logon         | Both                           |
| 0       | Heartbeat     | Both                           |
| 1       | TestRequest   | Both                           |
| 2       | ResendRequest | Both (KalshiRT, KalshiPT only) |
| 3       | Reject        | Server -> Client               |
| 4       | SequenceReset | Both (KalshiRT, KalshiPT only) |
| 5       | Logout        | Both                           |

### Application-Level

#### Order Entry

| MsgType | Name                      | Sessions                     | Direction        |
| ------- | ------------------------- | ---------------------------- | ---------------- |
| D       | NewOrderSingle            | KalshiNR, KalshiRT           | Client -> Server |
| F       | OrderCancelRequest        | KalshiNR, KalshiRT           | Client -> Server |
| G       | OrderCancelReplaceRequest | KalshiNR, KalshiRT           | Client -> Server |
| q       | OrderMassCancelRequest    | KalshiNR                     | Client -> Server |
| 8       | ExecutionReport           | KalshiNR, KalshiRT, KalshiDC | Server -> Client |
| 9       | OrderCancelReject         | KalshiNR, KalshiRT           | Server -> Client |
| r       | OrderMassCancelReport     | KalshiNR                     | Server -> Client |
| j       | BusinessMessageReject     | All                          | Server -> Client |

#### Order Groups

| MsgType | Name               | Sessions           | Direction        |
| ------- | ------------------ | ------------------ | ---------------- |
| UOG     | OrderGroupRequest  | KalshiNR, KalshiRT | Client -> Server |
| UOH     | OrderGroupResponse | KalshiNR, KalshiRT | Server -> Client |

#### Drop Copy

| MsgType | Name                | Sessions | Direction        |
| ------- | ------------------- | -------- | ---------------- |
| U1      | EventResendRequest  | KalshiDC | Client -> Server |
| U2      | EventResendComplete | KalshiDC | Server -> Client |
| U3      | EventResendReject   | KalshiDC | Server -> Client |

After an EventResendRequest, the server replays the matching historical order updates as ExecutionReport (35=8) messages and then sends EventResendComplete (35=U2) or EventResendReject (35=U3).

#### Post Trade

| MsgType | Name                   | Sessions           | Direction        |
| ------- | ---------------------- | ------------------ | ---------------- |
| UMS     | MarketSettlementReport | KalshiPT, KalshiRT | Server -> Client |

#### RFQ

| MsgType | Name               | Sessions            | Direction                                               |
| ------- | ------------------ | ------------------- | ------------------------------------------------------- |
| R       | QuoteRequest       | KalshiRT, KalshiRFQ | KalshiRT: Client -> Server; KalshiRFQ: Server -> Client |
| b       | QuoteRequestAck    | KalshiRT            | Server -> Client                                        |
| S       | Quote              | KalshiRT, KalshiRFQ | KalshiRT: Server -> Client; KalshiRFQ: Client -> Server |
| AI      | QuoteStatusReport  | KalshiRFQ           | Server -> Client                                        |
| Z       | QuoteCancel        | KalshiRFQ           | Client -> Server                                        |
| U9      | QuoteCancelStatus  | KalshiRFQ           | Server -> Client                                        |
| AG      | QuoteRequestReject | KalshiRT, KalshiRFQ | Server -> Client                                        |
| UA      | AcceptQuote        | KalshiRT            | Client -> Server                                        |
| UC      | AcceptQuoteStatus  | KalshiRT            | Server -> Client                                        |
| U7      | QuoteConfirm       | KalshiRFQ           | Client -> Server                                        |
| U8      | QuoteConfirmStatus | KalshiRFQ           | Server -> Client                                        |
| UE      | RFQCancel          | KalshiRT            | Client -> Server                                        |
| UB      | RFQCancelStatus    | KalshiRT            | Server -> Client                                        |
