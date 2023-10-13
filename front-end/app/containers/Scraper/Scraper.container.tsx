import axios from "axios";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

import { OnSubmit, Scraper } from "@app/components/Scraper/Scraper.component";
import { useLoading } from "@app/hooks/useLoading";
import { useScraperService } from "@app/services/scraper/scraper.constants";

export const ScraperContainer: React.FC = () => {
  const [isLoading, startLoading, stopLoading] = useLoading();
  const [scrapedContent, setScrapedContent] = useState<unknown>(null);

  const scraperService = useScraperService();

  const onSubmit: OnSubmit = useMemo(() => {
    return async (input) => {
      startLoading();
      setScrapedContent(null);

      toast.info("Scraping the website...");

      try {
        const data = await scraperService.scrape(input.url);

        setScrapedContent(data);

        toast.success("Successfully scraped the website!");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        }
      } finally {
        stopLoading();
      }
    };
  }, []);

  return (
    <Scraper
      {...{
        onSubmit,
        isLoading,
        data: scrapedContent,
      }}
    />
  );
};
