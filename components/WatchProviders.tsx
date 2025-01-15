/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Provider {
  logo_path: string;
  provider_name: string;
  provider_id: number;
}

interface WatchProvidersProps {
  _providers: {
    flatrate?: Provider[];
    rent?: Provider[];
    buy?: Provider[];
    link?: string;
  };
}

export function WatchProviders({ _providers }: WatchProvidersProps) {
  const COUNTRIES: { [key: string]: string } = {
    US: "United States",
    GB: "United Kingdom",
    CA: "Canada",
    AU: "Australia",
    NZ: "New Zealand",
    IN: "India",
    FR: "France",
    DE: "Germany",
    ES: "Spain",
    IT: "Italy",
    JP: "Japan",
    BR: "Brazil",
    MX: "Mexico",
    AR: "Argentina",
    CH: "China",
    RU: "Russia",
    KR: "Korea",
    SG: "Singapore",
    HK: "Hong Kong",
    TW: "Taiwan",
    TH: "Thailand",
    PH: "Philippines",
    ID: "Indonesia",
    MY: "Malaysia",
    BE: "Belgium",
    NL: "Netherlands",
    NO: "Norway",
    SE: "Sweden",
    PL: "Poland",
  };

  const [country, setCountry] = useState("US");
  const [showOtherOptions, setShowOtherOptions] = useState(false);

  useEffect(() => {
    // Get user's country from browser locale

    const userLocale = navigator.language || navigator.languages[0];
    const userCountry = userLocale.split("-")[1] || "US";

    // Check if we support this country, otherwise fallback to US

    setCountry(userCountry);
  }, []);

  if (!_providers || !_providers[country]) return null;

  const providers = _providers[country];
  return (
    <div className="flex flex-col gap-4 p-4">
      {providers?.flatrate && providers?.flatrate.length > 0 && (
        <div>
          <div className="w-full flex justify-between items-center">
            <h4 className="text-sm font-semibold mb-2">Where to Stream</h4>
            <Button
              variant="link"
              className="text-xs text-muted-foreground"
              onClick={() => setShowOtherOptions(!showOtherOptions)}
            >
              {showOtherOptions ? "Hide More" : "Show More"}
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {providers?.flatrate.map((provider) => (
              <ProviderLogo provider={provider} key={provider.provider_id} />
            ))}
          </div>
        </div>
      )}

      {providers.rent && providers.rent.length > 0 && showOtherOptions && (
        <div>
          <h4 className="text-sm font-semibold mb-2">Rent</h4>
          <div className="flex gap-2 flex-wrap">
            {providers.rent.map((provider) => (
              <ProviderLogo provider={provider} key={provider.provider_id} />
            ))}
          </div>
        </div>
      )}

      {providers.buy && providers.buy.length > 0 && showOtherOptions && (
        <div>
          <h4 className="text-sm font-semibold mb-2">Buy</h4>
          <div className="flex gap-2 flex-wrap">
            {providers.buy.map((provider) => (
              <ProviderLogo provider={provider} key={provider.provider_id} />
            ))}
          </div>
        </div>
      )}

      {/* {providers.link && (
        <a
          href={providers.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline"
        >
          View all watching options
        </a>
      )} */}
    </div>
  );
}

const ProviderLogo = ({ provider }: { provider: Provider }) => {
  const getProviderUrl = (providerName: string) => {
    // Map provider names to their correct URLs
    const providerUrls: { [key: string]: string } = {
      "Disney Plus": "disneyplus",
      Netflix: "netflix",
      // Add more mappings as needed
    };

    const urlName =
      providerUrls[providerName] ||
      providerName.toLowerCase().replace(/\s+/g, "");
    return `https://www.${urlName}.com`;
  };

  return (
    <Link href={getProviderUrl(provider.provider_name)} target="_blank">
      <div
        className="relative w-12 h-12 rounded-lg overflow-hidden hover:scale-110 transition-all duration-100"
        title={provider.provider_name}
      >
        <img
          src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
          alt={provider.provider_name}
          // fill
          className="object-cover"
        />
      </div>
    </Link>
  );
};
