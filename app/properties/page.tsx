import PropertiesClient from "./PropertiesClient";
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
// Actions
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";


const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  // Case 1
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login"/>
  }

  const listings = await getListings({ userId: currentUser.id });
  // Case 2
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No properties found" subtitle="Looks like you have no properties."/>
      </ClientOnly>
    );
  }

  // Case 3
  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser}/>
    </ClientOnly>
  );
}

export default PropertiesPage;
