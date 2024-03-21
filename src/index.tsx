import { projectDescriptor } from 'app/editor/model';
import { PROJECT } from 'app/editor/prototypes';
import { install } from 'app/install';
import { checkExists } from 'base/preconditions';
import { createRoot } from 'react-dom/client';

window.addEventListener('load', function () {
  const elementId = 'app';
  const appNode = document.getElementById(elementId);
  const app = createRoot(
    checkExists(appNode, 'element with id "{0}" not found', elementId),
  );
  const App = install();

  const project = projectDescriptor.create(PROJECT);

  app.render(
    (
      <App
        project={project}
        locale='en'
      />
    ),
  );
});
