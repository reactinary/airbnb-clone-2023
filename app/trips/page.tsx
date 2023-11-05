import TripsClient from "./TripsClient";
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";


const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  // Case 1
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login"/>
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });
  // Case 2
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No trips found" subtitle="Looks like you havent reserved any trips."/>
      </ClientOnly>
    );
  }

  // Case 3
  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser}/>
    </ClientOnly>
  );
}

export default TripsPage;
