import { ScraperContainer } from "@app/containers/Scraper/Scraper.container";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <div className="mt-16">
        <h1 className="text-4xl font-bold text-center text-white">
          Web Scraping API
        </h1>
      </div>

      <div className="flex mt-16 justify-center p-4">
        <div className="w-full">
          <ScraperContainer />
        </div>
      </div>
    </div>
  );
}
