import axios from "axios";
import Image from "next/image";
import { Fragment, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@app/components/Button/Button.component";
import { Modal } from "@app/components/Modal/Modal.component";
import { OnSubmit, Scraper } from "@app/components/Scraper/Scraper.component";
import { useLoading } from "@app/hooks/useLoading";
import { useScraperService } from "@app/services/scraper/scraper.constants";

export const ScraperContainer: React.FC = () => {
  const [isLoading, startLoading, stopLoading] = useLoading();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<unknown>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [screenshotImage, setScreenshotImage] = useState<string | null>(null);

  const scraperService = useScraperService();

  const onSubmit: OnSubmit = useMemo(() => {
    return async (input) => {
      startLoading();
      setUrl(input.url);
      setData(null);

      toast.info("Checking the website...");

      try {
        const screenshotImage = await scraperService.getScreenshot(input.url);

        setScreenshotImage(`data:image/png;base64,${screenshotImage}`);
        setIsModalOpen(true);

        toast.success("The connection to the website was successful.");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        }
      } finally {
        stopLoading();
      }
    };
  }, []);

  const onScrape = useMemo(() => {
    return async () => {
      startLoading();
      setIsModalOpen(false);
      setUrl(null);
      setData(null);

      toast.info("Scraping the website...");

      try {
        const data = await scraperService.scrape(url as string);

        setData(data);
        setIsModalOpen(false);

        toast.success("The website was successfully scraped.");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        }
      } finally {
        stopLoading();
      }
    };
  }, [url]);

  return (
    <Fragment>
      <Scraper
        {...{
          onSubmit,
          isLoading,
          data,
        }}
      />
      {screenshotImage && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Confirmation"
        >
          <div className="flex justify-center flex-col items-center p-4">
            <div className="border-2 border-gray-300 rounded-lg overflow-hidden shadow-md">
              <Image
                src={screenshotImage}
                alt="Website Screenshot"
                width={1920}
                height={1080}
              />
            </div>
            <Button
              className="bg-green-500 hover:bg-green-600 active:bg-green-700 mt-16 text-white rounded px-4 py-2 w-full"
              onClick={onScrape}
            >
              Start!
            </Button>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};
