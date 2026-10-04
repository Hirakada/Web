"use client";

import { useEffect } from "react";

import { initializeFirebase } from "./client";

export function FirebaseInitializer() {
  useEffect(() => {
    initializeFirebase();
  }, []);

  return null;
}
