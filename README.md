# podrida-app

To install dependencies, run the following command:

```bash
npm install
```

To set up git hooks, run the following command:

```bash
#!/bin/bash

echo "Configuring permissions for Git hooks..."

git config core.hooksPath .scripts

# Set executable permissions for pre-commit hook
chmod +x .scripts/pre-commit
# Add other hooks here ...

echo "Git hooks permissions configured successfully."
```

This is the Web-App for the card game "Podrida"

[https://podrida-h2048zs3n-martinbarreiroos-projects.vercel.app/
](https://podrida-app-theta.vercel.app/)
