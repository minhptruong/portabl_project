import {
  BbsBlsSignature2020
} from "@mattrglobal/jsonld-signatures-bbs";

import pkg from 'jsonld-signatures';
const { verify } = pkg;

import { document_loader, get_purpose} from "./utilities.js";
import signedDocument from "./data/signed_doc.json" assert {type: 'json'};

export async function verify_proof(request_data) {
  var purpose = get_purpose(request_data.purpose)
  var signedDocument = request_data.signed_doc

  return await verify(signedDocument, {
    suite: new BbsBlsSignature2020(),
    purpose: purpose,
    documentLoader: document_loader
  })
}