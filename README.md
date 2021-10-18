![npm](https://img.shields.io/npm/v/@jupita/sdk)

# Jupita Javascript SDK
This library will allow you to make the required `dump` API calls with Jupita. All API calls are made asynchronously, thus there are event listeners available to handle the API results.


## Overview
Jupita is an API product that provides deep learning powered touchpoint analytics. Within the SDK documentation, `MessageType` refers to which user the utterance is from. `MessageType` 0 = `Touchpoint` and `MessageType` 1 = `Input`, although these labels are handled by the SDK.

The required parameters for the APIs include setting `MessageType` along with assigning a `touchpointId` + `inputId` to be passed, how this is structured or deployed is completely flexible and customizable. Please note when assigning the `touchpointId` that no data will be available for that particular touchpoint until the touchpoint has sent at least 1 utterance via the `dump` API. 


## APIs
There is one API within the Jupita product – `dump`:

- `dump` allows you to dump each utterance.


##  Quickstart
### Step 1
Install Jupita;

```
npm install @jupita/sdk
```

### Step 2
Build Jupita. Insert your API key as the token as well as a touchpoint user ID;

```
const { Jupita } = require("@jupita/sdk")

const jupita = new Jupita(token, touchpointId)
```

### Step 3
Dump an utterance from a touchpoint by calling the dump API as a message by specifying the message text and the ID of the input, represented in the example below as '3'. Message dumps are by default from a touchpoint unless otherwise specified. 

The parameter `isCall` is required and set to false by default. This tells Jupita if the utterance is from an audio call. When dumping an utterance from an audio call, set the `isCall` parameter to `true` otherwise set to `false`;

```
const { Jupita, MessageType } = require("@jupita/sdk")

jupita.dump("Hi, how are you?", 3, MessageType.Touchpoint, false)
```

Similarly, call the dump API whenever dumping an utterance from an input by specifying the message text and ID of the input;
```
const { Jupita, MessageType } = require("@jupita/sdk")

jupita.dump("Hi, good thanks!", 3, MessageType.Input, false)
```

Additionally, you may define a listener as per below;

```
jupita.dump("Hi, good thanks!", 3, MessageType.Input, false, {
    onError: (statusCode, response) => {
        console.log(statusCode)
        console.log(response)
    }, 
        onSuccess: (week) => {
        console.log(week)
    }
})
```

## Error handling
- The SDK will throw an `InvalidParameterException` error which occurs if the `MessageType` set in the dump method is not 1 or 0.
- `JSONException` which occurs if the user input is not JSON compatible. This can be incorrect usage of strings when passed on to the Jupita methods.
- A 401 error code is thrown when the token is incorrect, otherwise Jupita returns error 400 with details.


## Libraries
Use Step 1 and 2 so that the Jupita Javascript SDK is available within the scope of the project.


## Classes
The available product under the Javascript SDK is Jupita. Jupita can be constructed directly using the public constructor but it is highly recommended to use the built class. This will ensure that mistakes are not made while building Jupita.

```
const { Jupita } = require("@jupita/sdk")

const jupita = new Jupita(token, touchpointId)
```

## API Reference
#### `dump` Method Definition

* text (required)
* inputId (required)
* MessageType (required, default = Touchpoint)
* isCall (required, default=false)
* listener (optional)

To avoid illegal argument error for `MessageType`, use `MessageType.Touchpoint` or `MessageType.Input`.

## Support
If you require additional support please contact support@jupita.io
