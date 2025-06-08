import { Asset, AssetCategory, Bid, Wishlist } from "@/src/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { httpClient } from "../lib/http-client";
import { mockAssets } from "../mocks/assets";

interface AuctionState {
  assets: Asset[];
  featuredAssets: Asset[];
  shortlistedAssets: string[];
  currentAsset: Asset | null;
  bids: Record<string, Bid[]>;
  isLoading: boolean;

  // Actions
  fetchAssets: () => Promise<void>;
  fetchAssetById: (id: string) => Promise<void>;
  fetchAssetsByCategory: (category: AssetCategory) => Promise<Asset[]>;
  fetchShortListedAssets: () => Promise<void>;
  fetchFeaturedAssets: () => Promise<void>;
  toggleShortlist: (assetId: string) => void;
  placeBid: (assetId: string, amount: number) => Promise<void>;
  fetchBidsForAsset: (assetId: string) => Promise<Bid[]>;
  searchAssets: (query: string) => Promise<Asset[]>;
}

export const useAuctionStore = create<AuctionState>()(
  persist(
    (set, get) => ({
      assets: [],
      featuredAssets: [],
      shortlistedAssets: [],
      currentAsset: null,
      bids: {},
      isLoading: false,

      fetchShortListedAssets: async () => {
        set({ isLoading: true });
        try {
          const shortlisted = (await httpClient.get(
            "/api/wishlist"
          )) as AxiosResponse<Wishlist[]>;
          console.log(shortlisted);
          if (shortlisted) {
            set({
              shortlistedAssets: shortlisted.data.map((item) =>
                String(item.auction.id)
              ),
              isLoading: false,
            });
          }
        } catch (error) {
          console.error("Error fetching shortlisted assets:", error);
          set({ isLoading: false });
        }
      },
      fetchAssets: async () => {
        set({ isLoading: true });
        try {
          const featured = await httpClient.get("/api/auctions");
          console.log(featured);
          set({ assets: featured.data, isLoading: false });
        } catch (error) {
          console.error("Error fetching assets:", error);
          set({ isLoading: false });
        }
      },

      fetchAssetById: async (id: string) => {
        set({ isLoading: true });
        try {
          const asset = await httpClient.get("/api/auctions/" + id);
          console.log(asset);
          set({ currentAsset: asset.data, isLoading: false });
        } catch (error) {
          console.error("Error fetching asset:", error);
          set({ isLoading: false });
        }
      },

      fetchAssetsByCategory: async (category: AssetCategory) => {
        set({ isLoading: true });
        try {
          // Simulating API call
          await new Promise((resolve) => setTimeout(resolve, 800));
          const filteredAssets = mockAssets.filter(
            (a) => a.category === category
          );
          set({ isLoading: false });
          return filteredAssets;
        } catch (error) {
          console.error("Error fetching assets by category:", error);
          set({ isLoading: false });
          return [];
        }
      },

      fetchFeaturedAssets: async () => {
        set({ isLoading: true });
        try {
          // Simulating API call
          // await new Promise((resolve) => setTimeout(resolve, 800));
          // const featured = mockAssets.filter((a) => a.featured);
          const featured = await httpClient.get("/api/auctions?featured=true");
          console.log(featured);
          set({ featuredAssets: featured.data, isLoading: false });
        } catch (error) {
          console.error("Error fetching featured assets:", error);
          set({ isLoading: false });
        }
      },

      toggleShortlist: async (assetId: string) => {
        set((state) => {
          const isShortlisted = state.shortlistedAssets.includes(assetId);
          const updatedState = {
            shortlistedAssets: isShortlisted
              ? state.shortlistedAssets.filter((id) => id !== assetId)
              : [...state.shortlistedAssets, assetId],
          };

          isShortlisted
            ? httpClient.delete("/api/wishlist/" + assetId)
            : httpClient.post("/api/wishlist/" + assetId, null);

          return updatedState;
        });
      },

      placeBid: async (assetId: string, amount: number) => {
        set({ isLoading: true });
        try {
          const response = await httpClient.post(
            `/api/auctions/${assetId}/bid`,
            {
              bidAmount: amount,
            }
          );

          const newBid = response.data;

          set((state) => {
            // Update asset's current bid
            const updatedAssets = state.assets.map((asset) =>
              asset.id === assetId
                ? { ...asset, currentBid: amount, bidCount: asset.bidCount + 1 }
                : asset
            );

            // Update current asset if it's the one being bid on
            const updatedCurrentAsset =
              state.currentAsset?.id === assetId
                ? {
                    ...state.currentAsset,
                    currentBid: amount,
                    bidCount: (state.currentAsset.bidCount || 0) + 1,
                  }
                : state.currentAsset;

            // Update bids for this asset
            const assetBids = state.bids[assetId] || [];
            const updatedBids = {
              ...state.bids,
              [assetId]: [newBid, ...assetBids],
            };

            return {
              assets: updatedAssets,
              currentAsset: updatedCurrentAsset,
              bids: updatedBids,
              isLoading: false,
            };
          });
        } catch (error) {
          console.error("Error placing bid:", error);
          set({ isLoading: false });
          throw error;
        }
      },

      fetchBidsForAsset: async (assetId: string) => {
        set({ isLoading: true });
        try {
          const response = await httpClient.get(
            `/api/auctions/${assetId}/bids`
          );

          const bids = response.data;

          set((state) => ({
            bids: { ...state.bids, [assetId]: bids },
            isLoading: false,
          }));

          return bids;
        } catch (error) {
          console.error("Error fetching bids:", error);
          set({ isLoading: false });
          return [];
        }
      },

      searchAssets: async (query: string) => {
        set({ isLoading: true });
        try {
          // Simulating API call
          await new Promise((resolve) => setTimeout(resolve, 800));

          const normalizedQuery = query.toLowerCase().trim();
          const results = mockAssets.filter(
            (asset) =>
              asset.title.toLowerCase().includes(normalizedQuery) ||
              asset.description.toLowerCase().includes(normalizedQuery) ||
              asset.location.toLowerCase().includes(normalizedQuery) ||
              asset.bankName.toLowerCase().includes(normalizedQuery)
          );

          set({ isLoading: false });
          return results;
        } catch (error) {
          console.error("Error searching assets:", error);
          set({ isLoading: false });
          return [];
        }
      },
    }),
    {
      name: "auction-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        shortlistedAssets: state.shortlistedAssets,
      }),
    }
  )
);
