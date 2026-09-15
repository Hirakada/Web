export type Database = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };

  affiliate: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          slug: string;
          description?: string | null;
          image?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };

      subcategories: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          slug: string;
          description: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id: string;
          category_id: string;
          name: string;
          slug: string;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };

      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          video_url: string | null;
          category_id: string;
          subcategory_id: string | null;
          featured: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          category_id: string;
          subcategory_id?: string | null;
          featured?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          category_id?: string;
          subcategory_id?: string | null;
          featured?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_subcategory_id_fkey";
            columns: ["subcategory_id"];
            isOneToOne: false;
            referencedRelation: "subcategories";
            referencedColumns: ["id"];
          },
        ];
      };

      marketplaces: {
        Row: {
          id: string;
          name: string;
          slug: string;
          icon: string | null;
          sort_order: number;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          slug: string;
          icon?: string | null;
          sort_order?: number;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          icon?: string | null;
          sort_order?: number;
          active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };

      product_marketplaces: {
        Row: {
          id: string;
          product_id: string;
          marketplace_id: string;
          affiliate_url: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          product_id: string;
          marketplace_id: string;
          affiliate_url: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          marketplace_id?: string;
          affiliate_url?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_marketplaces_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "product_marketplaces_marketplace_id_fkey";
            columns: ["marketplace_id"];
            isOneToOne: false;
            referencedRelation: "marketplaces";
            referencedColumns: ["id"];
          },
        ];
      };
    };

    Views: Record<string, never>;

    Functions: {
      search_products: {
        Args: {
          search_query?: string;
          result_limit?: number;
          result_offset?: number;
        };
        Returns: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          category_id: string;
          category_name: string;
          category_slug: string;
          subcategory_id: string | null;
          subcategory_name: string | null;
          subcategory_slug: string | null;
          featured: boolean;
          sort_order: number;
          created_at: string;
        }[];
      };

      count_products: {
        Args: {
          search_query?: string;
        };
        Returns: number;
      };
    };

    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
