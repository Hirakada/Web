 "use client";

 import {
  CircleDollarSign,
  Droplets,
  Gamepad2,
  HeartPulse,
  Phone,
  Smartphone,
  WalletCards,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { InfiniteSlider } from "@hirakada/ui";

type PpobService = {
  id: string;
  label: string;
  icon: LucideIcon;
};

const PPOB_SERVICES: PpobService[] = [
  {
    id: "pln",
    label: "PLN",
    icon: Zap,
  },
  {
    id: "pdam",
    label: "PDAM",
    icon: Droplets,
  },
  {
    id: "telkom",
    label: "Telkom",
    icon: Phone,
  },
  {
    id: "pulsa",
    label: "Pulsa",
    icon: Smartphone,
  },
  {
    id: "paket-data",
    label: "Paket Data",
    icon: Wifi,
  },
  {
    id: "bpjs",
    label: "BPJS",
    icon: HeartPulse,
  },
  {
    id: "ewallet",
    label: "E-Wallet",
    icon: WalletCards,
  },
  {
    id: "voucher-game",
    label: "Voucher Game",
    icon: Gamepad2,
  },
  {
    id: "topup",
    label: "Top Up",
    icon: CircleDollarSign,
  },
];

function PpobItem({ service }: { service: PpobService }) {
  const Icon = service.icon;

  return (
    <div
      className="flex h-12 w-16 shrink-0 items-center justify-center"
      role="img"
      title={service.label}
      aria-label={service.label}
    >
      <Icon
        size={28}
        strokeWidth={1.7}
        aria-hidden="true"
        style={{
          color: "var(--color-primary)",
        }}
      />
    </div>
  );
}

export default function PpobSlider() {
  return (
    <section
      className="relative mt-8 w-full overflow-hidden"
      aria-label="Layanan PPOB"
    >
      <InfiniteSlider
        gap={28}
        duration={60}
        durationOnHover={120}
        className="w-full"
      >
        {PPOB_SERVICES.map((service) => (
          <PpobItem key={service.id} service={service} />
        ))}
      </InfiniteSlider>
    </section>
  );
}