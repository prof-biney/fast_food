import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: "com.profbiney.fastfood",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  userCollectionId: "687579d00005ff8533cf",
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);

// Function to create a new user
export const createUser = async ({
  name,
  email,
  password,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);

    if (!newAccount) {
      throw new Error("User creation failed");
    }

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      newAccount.$id,
      {
        accountId: newAccount.$id,
        name: newAccount.name,
        email: newAccount.email,
        avatar: avatarUrl,
      }
    );
  } catch (error: any) {
    throw new Error(
      (error as string) || "An error occurred while creating user."
    );
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    if (!session) {
      throw new Error("Sign in failed");
    }
  } catch (error: any) {
    throw new Error((error as string) || "An error occurred while signing in.");
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
  } catch (error: any) {
    throw new Error(
      (error as string) || "An error occurred while logging out."
    );
  }
};
