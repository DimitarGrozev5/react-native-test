import AppLayout from '../components/app-layout';
import DataOverview from '../components/data-overview/DataOverview';
import GoalControl from '../components/goal-control/GoalControl';
import SessionControl from '../components/session-control/SessionControl';

const HomeScreen = () => {
  return (
    <>
      <AppLayout>
        <SessionControl />
        <GoalControl />
        <DataOverview />
      </AppLayout>
    </>
  );
};

export default HomeScreen;
