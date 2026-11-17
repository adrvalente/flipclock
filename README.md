# FlipClock V2.2.0

Relógio digital com animação flip, temas, formato 12/24h, modo só relógio com redimensionamento automático, botão Sair com ocultação automática e gestão de alarmes.

## Executar

Abrir `index.html` no navegador ou publicar os ficheiros no GitHub Pages. Não requer servidor ou dependências.

## Alarmes

- Abrir **Alarmes** na barra lateral.
- Criar alarmes únicos ou recorrentes (diário, dias úteis, fim de semana, dias personalizados).
- Editar, ativar/desativar e eliminar alarmes.
- Premir **Ativar som** para permitir a reprodução do toque no navegador; pode ser necessário fazê-lo novamente após reabrir a página.
- Quando um alarme toca, é apresentado um aviso sobre o relógio, mesmo em modo Só relógio, com opções Parar, Adiar 5 min e Adiar 10 min.
- Os alarmes são guardados no `localStorage` do navegador. Os adiamentos não persistem após fechar/recarregar a página.

**Limitações:** o website precisa de estar aberto. Os navegadores podem suspender temporizadores em segundo plano, impedir áudio automático ou não disparar alarmes com o dispositivo suspenso. Não utilizar como único alarme para situações importantes. Não há notificações push nem serviço em segundo plano.

## Ficheiros

- `index.html`: interface
- `css/style.css`: estilos
- `js/script.js`: relógio, temas e modos
- `js/alarms.js`: alarmes e persistência local

## Publicação

Compatível com alojamento estático, incluindo GitHub Pages.
