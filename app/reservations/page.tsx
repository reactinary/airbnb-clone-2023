import TripsClient from "./ReservationsClient";
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
// Actions
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";


const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  // Case 1
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login"/>
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id });
  // Case 2
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No reservations found" subtitle="Looks like you have no reservations on your properties."/>
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

export default ReservationsPage;
