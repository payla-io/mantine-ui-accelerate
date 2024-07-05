import { Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";

export interface OpenConfirmModalPayload {
  title: string;
  children: React.ReactNode;
  labels: { confirm: string; cancel: string };
  onCancel: () => void;
  onConfirm: () => void;
}
export const openConfirmModal = (payload: OpenConfirmModalPayload) =>
  modals.openConfirmModal({
    title: <Title size={"20px"}>{payload.title}</Title>,
    children: payload.children,
    labels: payload.labels ?? { confirm: "Confirm", cancel: "Cancel" },
    onCancel: payload.onCancel,
    onConfirm: payload.onConfirm,
  });

export function getFormattedIban(iban?: string) {
  if (!iban) {
    return "";
  }

  return iban
    .replace(/[^\dA-Z]/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

export const fileToBase64 = async (file: File) =>
  new Promise<string | null>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        resolve(null);
      }
    };
    reader.onerror = (error) => reject(error);
  });

export function currencySymbolForCode(currencyCode: string) {
  const amount = 0;
  return amount
    .toLocaleString("en", {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "symbol",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace("0.00", "");
}

export function convertNumberToMonetaryValue(
  value: number,
  minimumFractionDigits: number = 2,
  locales?: string
) {
  return value.toLocaleString(locales, {
    minimumFractionDigits,
    maximumFractionDigits: 2,
  });
}

export const displayCurrency = (value: number, symbol: string = "€") => {
  return `${symbol}${convertNumberToMonetaryValue(value)}`;
};

export function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
