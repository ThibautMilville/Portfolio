# Portfolio

Portfolio professionnel (Next.js).

## Dev local (daemon - port 3000)

Les shells background Cursor recoivent souvent `status: aborted` quand un agent
se termine ou est remplace. Un `npm run dev` attache a ce shell meurt avec lui
(SIGTERM / exit 143). Ce n'est **pas** (principalement) un conflit de port.

**Demarrage durable** (systemd --user, fallback setsid ; PID/log sous `.local/`) :

```bash
npm run dev:daemon
# -> http://localhost:3000
# log: .local/portfolio-dev.log
```

Arret / statut (ne tue que les process dont le `cwd` est ce repo) :

```bash
npm run dev:stop
npm run dev:status
```

Autre port : `PORT=3011 npm run dev:daemon`

### Foreground (terminal interactif seulement)

```bash
npm run dev
# ou cleanup cwd-scoped :
npm run dev:safe
```

Les **agents Cursor** doivent utiliser `npm run dev:daemon`, jamais un
`npm run dev` en background Shell (il sera aborte).

### Ne pas faire

- `fuser -k 3000/tcp` / `lsof -ti:3000 | xargs kill` pour "liberer le port"
- Tuer un process sur 3000 sans verifier son `cwd`
- Relancer Portfolio via un shell background Cursor attache

### Production locale

```bash
npm run build && npm start
# -> http://localhost:3000
```
