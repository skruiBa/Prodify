import Button from '@/components/Button';
import PageWrapper from '@/components/PageWrapper';
import TopNavbar from '@/components/Task/TasksTopNavbar';

export default function Home() {
  return (
    <>
      <TopNavbar />
      <PageWrapper>
        <h1 className="text-4xl font-bold">Habit Tracker</h1>
        <p className="text-2xl font-bold">"YOU CAN DO ANYTHING"</p>

        <Button>Get Started</Button>
      </PageWrapper>
    </>
  );
}
