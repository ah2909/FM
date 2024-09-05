"use client";

import Navbar from "@/components/NavBar";

export default function Dashboard() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-primary tracking-light text-[32px] font-bold leading-tight min-w-72">
                Portfolio Overview
              </p>
            </div>
            <h3 className="text-primary text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Total Value
            </h3>
            <h1 className="text-primary text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
              $1,000,000
            </h1>
            <h2 className="text-primary text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
              3.2% today
            </h2>
            <div className="flex-wrap gap-3 flex justify-center">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#2884e6] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                <span className="truncate">Deposit</span>
              </button>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#e7edf3] text-primary text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                <span className="truncate">Withdraw</span>
              </button>
            </div>

            <h3 className="mt-4 text-primary text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Asset Distribution
            </h3>
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between">
                <p className="text-primary text-base font-medium leading-normal">
                  Stocks
                </p>
                <p className="text-primary text-sm font-normal leading-normal">
                  35%
                </p>
              </div>
              <div className="rounded bg-background">
                <div className="h-2 rounded bg-[#2884e6] w-[35%]"></div>
              </div>
              <p className="text-primary text-sm font-normal leading-normal">
                $350,000
              </p>
            </div>
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between">
                <p className="text-primary text-base font-medium leading-normal">
                  Cryptocurrencies
                </p>
                <p className="text-primary text-sm font-normal leading-normal">
                  15%
                </p>
              </div>
              <div className="rounded bg-background">
                <div className="h-2 rounded bg-[#2884e6] w-[15%]"></div>
              </div>
              <p className="text-[#4e7297] text-sm font-normal leading-normal">
                $150,000
              </p>
            </div>
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between">
                <p className="text-primary text-base font-medium leading-normal">
                  Cash
                </p>
                <p className="text-primary text-sm font-normal leading-normal">
                  50%
                </p>
              </div>
              <div className="rounded bg-background">
                <div className="h-2 rounded bg-[#2884e6] w-[50%]"></div>
              </div>
              <p className="text-[#4e7297] text-sm font-normal leading-normal">
                $500,000
              </p>
            </div>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-secondary bg-slate-50">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-120 px-4 py-3 text-left text-primary w-[400px] text-sm font-medium leading-normal">
                        Asset
                      </th>
                      <th className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-240 px-4 py-3 text-left text-primary w-[400px] text-sm font-medium leading-normal">
                        Price
                      </th>
                      <th className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-360 px-4 py-3 text-left text-primary w-60 text-sm font-medium leading-normal">
                        Change
                      </th>
                      <th className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-480 px-4 py-3 text-left text-primary w-[400px] text-sm font-medium leading-normal">
                        Total Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-t-secondary">
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-120 h-[72px] px-4 py-2 w-[400px] text-[#4e7297] text-sm font-normal leading-normal">
                        Stocks
                      </td>
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-240 h-[72px] px-4 py-2 w-[400px] text-[#4e7297] text-sm font-normal leading-normal">
                        $100,000
                      </td>
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#e7edf3] text-primary text-sm font-medium leading-normal w-full">
                          <span className="truncate">+3.2%</span>
                        </button>
                      </td>
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-480 h-[72px] px-4 py-2 w-[400px] text-[#4e7297] text-sm font-normal leading-normal">
                        $100,000
                      </td>
                    </tr>
                    <tr className="border-t border-t-secondary">
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-120 h-[72px] px-4 py-2 w-[400px] text-[#4e7297] text-sm font-normal leading-normal">
                        Real Estate
                      </td>
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-240 h-[72px] px-4 py-2 w-[400px] text-[#4e7297] text-sm font-normal leading-normal">
                        $150,000
                      </td>
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#e7edf3] text-primary text-sm font-medium leading-normal w-full">
                          <span className="truncate">-1.2%</span>
                        </button>
                      </td>
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-480 h-[72px] px-4 py-2 w-[400px] text-[#4e7297] text-sm font-normal leading-normal">
                        $150,000
                      </td>
                    </tr>
                    <tr className="border-t border-t-secondary">
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-120 h-[72px] px-4 py-2 w-[400px] text-[#4e7297] text-sm font-normal leading-normal">
                        Cash
                      </td>
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-240 h-[72px] px-4 py-2 w-[400px] text-[#4e7297] text-sm font-normal leading-normal">
                        $500,000
                      </td>
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#e7edf3] text-primary text-sm font-medium leading-normal w-full">
                          <span className="truncate">+0.1%</span>
                        </button>
                      </td>
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-480 h-[72px] px-4 py-2 w-[400px] text-[#4e7297] text-sm font-normal leading-normal">
                        $500,000
                      </td>
                    </tr>
                    <tr className="border-t border-t-secondary">
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-120 h-[72px] px-4 py-2 w-[400px] text-[#4e7297] text-sm font-normal leading-normal">
                        Cryptocurrencies
                      </td>
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-240 h-[72px] px-4 py-2 w-[400px] text-[#4e7297] text-sm font-normal leading-normal">
                        $100,000
                      </td>
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#e7edf3] text-primary text-sm font-medium leading-normal w-full">
                          <span className="truncate">+5.2%</span>
                        </button>
                      </td>
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-480 h-[72px] px-4 py-2 w-[400px] text-[#4e7297] text-sm font-normal leading-normal">
                        $100,000
                      </td>
                    </tr>
                    <tr className="border-t border-t-secondary">
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-120 h-[72px] px-4 py-2 w-[400px] text-[#4e7297] text-sm font-normal leading-normal">
                        Bonds
                      </td>
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-240 h-[72px] px-4 py-2 w-[400px] text-[#4e7297] text-sm font-normal leading-normal">
                        $150,000
                      </td>
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#e7edf3] text-primary text-sm font-medium leading-normal w-full">
                          <span className="truncate">-0.2%</span>
                        </button>
                      </td>
                      <td className="table-5dbeca8d-b2f7-44a2-9818-419ae5162078-column-480 h-[72px] px-4 py-2 w-[400px] text-[#4e7297] text-sm font-normal leading-normal">
                        $150,000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
