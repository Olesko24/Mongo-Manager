import SideMenu from '@/components/SideMenu';

const dbData = [
  { title: 'admin', value: 'admin' },
  { title: 'test', value: 'test' }
];

const collectionData = [
  { title: 'users', value: 'users' },
  { title: 'posts', value: 'posts' }
];

const Home = () => {
  return (
    <main className="font-nunito text-gray-700">
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <SideMenu data={dbData} title="Databases" />
        </div>
        <div className="col-span-2">
          <SideMenu data={collectionData} title="Collections" />
        </div>
        <div className="col-span-8"></div>
      </div>
    </main>
  );
};

export default Home;

/**
 * Idee:
 * Menü zusammenklappen wenn etwas ausgewählt wurde und nur ausgewählte Daten anzeigen
 * --> framer motion
 */