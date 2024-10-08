const dotenv = require("dotenv");
const path = require("path");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS||"https://simkit-backend.vercel.app,http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = "http://localhost:5173,https://simkit-frontend.onrender.com";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      // path: "/admin",
      autoRebuild: process.env.NODE_ENV === "development",
      serve: process.env.NODE_ENV === "development",
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: process.env.STRIPE_API_KEY,
      payment_description: "Simkit Payment",
      capture: true,
      // webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
    },
  },
  {
    resolve: `medusa-fulfillment-shiprocket`,
    options: {
      channel_id: process.env.SHIPROCKET_CHANNEL_ID, //(required)
      email: process.env.SHIPROCKET_EMAIL, //(required)
      password: process.env.SHIPROCKET_PASSWORD, //(required)
      token: "", //(required. leave empty)
      pricing: 'calculated', //"flat_rate" or "calculated" (required)
      length_unit: 'cm', //"mm", "cm" or "inches" (required)
      multiple_items: 'split_shipment', //"single_shipment" or "split_shipment"(default) (required)
      inventory_sync: false, //true or false(default) (required)
      forward_action: 'create_order', //'create_fulfillment' or 'create_order'(default) (required)
      return_action: 'create_order', //'create_fulfillment' or 'create_order'(default) (required)
    }
  },
  {
    resolve: `medusa-storage-supabase`,
    options: {
      referenceID: process.env.STORAGE_BUCKET_REF,
      serviceKey: process.env.SUPABASE_SERVICE_KEY,
      bucketName: process.env.SUPABASE_BUCKET_NAME,
    },
  },
  {
    resolve: `@lambdacurry/medusa-fulfillment-shipstation`,
    options: {
      api_key: process.env.SHIPSTATION_API_KEY,
      api_secret: process.env.SHIPSTATION_SECRET_KEY,
      
      weight_units: 'ounces', // optional property, valid values are 'ounces', 'pounds', or 'grams'.
      dimension_units: 'inches' // optional property, valid values are 'centimeters' or 'inches'.
    }
  },
  {
    resolve: `@rsc-labs/medusa-store-analytics`,
    options: {
      enableUI: true
    }
  },
  {
    resolve: `@rsc-labs/medusa-affiliate-discount`,
    options: {
      enableUI: true,
      updateWhen: 'PAYMENT_CAPTURED'
    }
  },
  {
    resolve: `medusa-plugin-abandoned-cart`,
    /** @type {import('medusa-plugin-abandoned-cart').PluginOptions} */
    options: {
      sendgridEnabled: true,
      from: process.env.SENDGRID_FROM,
      enableUI: true,
      subject: "You have something in your cart",
      templateId: process.env.SENDGRID_ABANDONED_CART_TEMPLATE,
      days_to_track: 7,
      set_as_completed_if_overdue: true,
      max_overdue: "2h",
    
      // intervals: [
      //   {
      //     interval: "1d",
      //     subject: "You have something in your cart",
      //     templateId: process.env.SENDGRID_ABANDONED_CART_TEMPLATE,
         
      //   },
      //   {
      //     interval: "5d",
      //     subject: "You have something in your cart",
      //     templateId: process.env.SENDGRID_ABANDONED_CART_TEMPLATE,
         
      //   },
      // ],
    },
  },
  {
    resolve: `medusa-plugin-sendgrid`,
    options: {
      api_key: process.env.SENDGRID_API_KEY,
      from: process.env.SENDGRID_FROM,
      order_placed_template:process.env.SENDGRID_ORDER_PLACED_ID,
     
    },
  },

];

const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  // cacheService: {
  //   resolve: "@medusajs/cache-redis",
  //   options: {
  //     redisUrl: REDIS_URL
  //   }
  // },
  
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  worker_mode: process.env.MEDUSA_WORKER_MODE,
  jwt_secret: process.env.JWT_SECRET || "supersecret",
  cookie_secret: process.env.COOKIE_SECRET || "supersecret",
  store_cors: STORE_CORS,
  auth_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  // Uncomment the following lines to enable REDIS
  redis_url: REDIS_URL,
  database_extra: {
    ssl: {
      rejectUnauthorized: false
    }
  }
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
};
