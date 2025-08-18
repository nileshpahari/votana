use anchor_lang::prelude::*;

declare_id!("7K7wfs7ofow8gD2S41bzqs9NWqojQAxdgXxrLahLTiUc");

#[program]
pub mod votana {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
