import {
  Bls12381G2KeyPair,
  BbsBlsSignature2020
} from "@mattrglobal/jsonld-signatures-bbs";

import pkg from 'jsonld-signatures';
const { sign, verify, extendContextLoader } = pkg;

import revealDocument from "./data/deriveProofFrame.json" assert {type: 'json'};

import keyPairOptions from "./data/keyPair.json" assert {type: 'json'};
import { document_loader, get_purpose} from "./utilities.js";

export async function signer(request_data) {

  const keyPair = new Bls12381G2KeyPair(request_data.key_pair);
  var suite_obj = new BbsBlsSignature2020({ key: keyPair });

  var inputDocument = request_data.input_doc;
  var purpose = get_purpose(request_data.purpose)

  var signed_doc =  await sign(inputDocument, {
    suite: new BbsBlsSignature2020({ key: keyPair }),
    purpose: purpose,
    documentLoader: document_loader
  });

  return signed_doc;
}
