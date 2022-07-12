import pkg from 'jsonld-signatures';
const { extendContextLoader, purposes} = pkg;

import inputDocument from "./data/input_doc.json" assert {type: 'json'};
import signedDocument from "./data/signed_doc.json" assert {type: 'json'};
import revealDocument from "./data/deriveProofFrame.json" assert {type: 'json'};

import keyPairOptions from "./data/keyPair.json" assert {type: 'json'};
import exampleControllerDoc from "./data/controllerDocument.json" assert {type: 'json'};
import bbsContext from "./data/bbs.json" assert {type: 'json'};
import citizenVocab from "./data/citizenVocab.json" assert {type: 'json'};
import credentialContext from "./data/credentialsContext.json" assert {type: 'json'};
import suiteContext from "./data/suiteContext.json" assert {type: 'json'};


/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const documents = {
  "did:example:489398593#test": keyPairOptions,
  "did:example:489398593": exampleControllerDoc,
  "https://w3id.org/security/bbs/v1": bbsContext,
  "https://w3id.org/citizenship/v1": citizenVocab,
  "https://www.w3.org/2018/credentials/v1": credentialContext,
  "https://w3id.org/security/suites/jws-2020/v1": suiteContext,
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const customDocLoader = (url) => {
  const context = documents[url];

  if (context) {
    return {
      contextUrl: null, // this is for a context via a link header
      document: context, // this is the actual document that was loaded
      documentUrl: url, // this is the actual context URL after redirects
    };
  }

  console.log(
    `Attempted to remote load context : '${url}', please cache instead`
  );
  throw new Error(
    `Attempted to remote load context : '${url}', please cache instead`
  );
};

//Extended document load that uses local contexts
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const document_loader = extendContextLoader(customDocLoader);

export function get_purpose(purpose_type) {
  switch(purpose_type) {
    case "assertion":
      return new purposes.AssertionProofPurpose();
    case "authentication":
      return new purposes.AuthenticationProofPurpose();
    case "controller":
      return new purposes.ControllerProofPurpose();
    default:
      return new purposes.ProofPurpose();
  }
}