// import * as dotenv from 'dotenv';
// dotenv.config({
//   path: `${__dirname}/../.env`
// });
// export const port = Number(process.env.API_PORT);

// // Database configuration
// export const db_host = String(process.env.DB_HOST);
// export const db_port = Number(process.env.DB_PORT);
// export const db_name = String(process.env.DB_NAME);
// export const db_user = String(process.env.DB_USER);
// export const db_password = String(process.env.DB_PASSWORD);
// export const PG_SESSION = String(process.env.PG_SESSION);

// // MQTT
// export const MQTT_CLIENTID = String(process.env.MQTT_CLIENTID) ?? '';
// export const MQTT_USERNAME = String(process.env.MQTT_USERNAME) ?? 'admin';
// export const MQTT_PASSWORD = String(process.env.MQTT_PASSWORD) ?? 'MQTT_PASSWORD';
// export const MQTT_URL = String(process.env.MQTT_URL) ?? '';
// export const MQTT_BASE_TOPIC = String(process.env.MQTT_BASE_TOPIC) ?? '';

// //JWT 
// export const JWT_SECRET_ACCESS_TOKEN = String(process.env.JWT_SECRET_ACCESS_TOKEN) ?? '';
// export const JWT_ACCESS_TOKEN_EXPIRED = String(process.env.JWT_ACCESS_TOKEN_EXPIRED) ?? '';
// export const JWT_USER_ACCESS_TOKEN_EXPIRED = String(process.env.JWT_USER_ACCESS_TOKEN_EXPIRED) ?? '';

// // ENCRYPTION 
// export const COMMON_ENC_KEY = String(process.env.COMMON_ENC_KEY) ?? '';
// export const MESSAGE_ENC_KEY = String(process.env.MESSAGE_ENC_KEY) ?? '';
// export const CONTACTS_ENC_KEY = String(process.env.CONTACTS_ENC_KEY) ?? '';

// // Calls Type
// export const IN_COMING_TEXT = String(process.env.IN_COMING_TEXT) ?? '';
// export const OUT_GOING_TEXT = String(process.env.OUT_GOING_TEXT) ?? '';
// export const FAILED_TEXT = String(process.env.FAILED_TEXT) ?? '';
// export const REJECTED_TEXT = String(process.env.REJECTED_TEXT) ?? '';

// // AWS
// export const AWS_ACCESS_KEY = String(process.env.AWS_ACCESS_KEY) ?? '';
// export const AWS_SECRET_KEY = String(process.env.AWS_SECRET_KEY) ?? '';
// export const AWS_APPS_BUCKET_NAME = String(process.env.AWS_APPS_BUCKET_NAME) ?? '';
// export const AWS_MSG_BUCKET_NAME = String(process.env.AWS_MSG_BUCKET_NAME) ?? '';
// export const AWS_OS_BUCKET_NAME = String(process.env.AWS_OS_BUCKET_NAME) ?? '';
// export const AWS_REGION = String(process.env.AWS_REGION) ?? '';
// export const AWS_API_VERSION = String(process.env.AWS_API_VERSION) ?? '';
// export const AWS_S3_EXPIRED = String(process.env.AWS_S3_EXPIRED) ?? '';

// // PASSPORT SESSION SECRET KEY
// export const SESSION_SECRET = String(process.env.SESSION_SECRET) ?? '';

// // STRIPE KEYS
// export const MONTHLY_PLAN_ID = String(process.env.MONTHLY_PLAN_ID) ?? ""
// export const YEARLY_PLAN_ID = String(process.env.YEARLY_PLAN_ID) ?? ""
// export const STRIPE_SECERET_KEY = String(process.env.STRIPE_SECERET_KEY) ?? ""
// export const STRIPE_PUBLIC_KEY = String(process.env.STRIPE_PUBLIC_KEY) ?? ""

// // shopify 
// export const SHOPIFY_DOMAIN= String(process.env.SHOPIFY_DOMAIN) ?? ""
// export const SHOPIFY_TOKEN= String(process.env.SHOPIFY_TOKEN) ?? ""

// // MQTT Notification titles
// export const SWITCH = 'switch';
// export const LOCATION_TRACKING = 'location_tracking';
// export const PLAY_SOUND = 'play_sound';
// export const UPDATE_PARENT_PIN = 'update_parent_pin';
// export const DELTETE_ALL_CONTACTS = 'delete_all_contacts';
// export const DELTETE_CONTACT = 'contact_deleted';
// export const SYNC_CONTACT = 'sync_contact';
// export const ADD_CONTACT = 'add_contact';
// export const ADD_TO_FAV = 'add_to_favourite';
// export const REMOVE_FROM_FAV = 'remove_from_favourite';
// export const ADD_TO_BLOCK_LIST = 'add_to_blocked_list';
// export const REMOVE_FROM_BLOCK_LIST = 'remove_from_blocked_list';
// export const CONTACT_DELETE = 'contact_deleted';
// export const UPDATE_MESSAGE = 'update_message';
// export const UPDATE_CONVERSATION = 'update_conversation';
// export const BLOCK_CONTACT = 'block_contact';
// export const TOOLS = 'tools';
// export const SYNC_TOOLS = 'sync_tools';
// export const DISABLE_PERSON = 'disable_person';
// export const CURRENT_LOCATION = 'current_location';
// export const UPDATE_FAQS = 'update_faqs';
// export const UPDATE_APPS = 'update_apps';
// export const UPDATE_TOOLS = 'update_tools';
// export const UPDATE_CONTROLS = 'update_controls';
// export const LOGOUT = 'logout';
// export const EXPIRE_SUBSCRIPTION = 'expire_subscription';
// export const DISABLE_SUBSCRIPTION = 'disable_subscription';
// export const END_SUBSCRIPTION = 'end_subscription';