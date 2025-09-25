# Project Roadmap (Agile Sprints)

This document outlines the next steps for building out the loot generation project using weekly sprints in an agile style.

---

## Sprint 1 – Database Foundations
**Goals:**
- Design and implement the database schema.  
- Decide between JSON-in-user-table vs. separate `users` and `items` tables.  
- Create initial migrations.  

**Deliverables:**
- `users` table with fields: `id`, `name`, `class`.  
- `items` table with fields: `id`, `user_id`, `name`, `rarity`, etc.  
- Optional: `campaigns` table stub with `id`, `name`, `dm_id`.  

---

## Sprint 2 – Add Items Individually
**Goals:**
- Connect frontend to allow adding **single items** from API results.  
- Add **"Add Item" button** to item cards.  
- Store item in DB linked to user.  

**Deliverables:**
- Function: `addItemToUser(userId, item)`  
- UI: "Add" button on item cards triggers backend call.  
- Items persist in DB.  

---

## Sprint 3 – Add Items by Category
**Goals:**
- Enable users to bulk-add items by selecting an **equipment category**.  
- Add **"Add All from Category" button**.  
- Fetch items via API and insert them into DB.  

**Deliverables:**
- Function: `addCategoryItemsToUser(userId, category)`  
- UI: Dropdown or button for category selection.  
- Verified DB population with multiple items.  

---

## Sprint 4 – User Authentication & Item Lists
**Goals:**
- Implement **user login** (basic auth or OAuth).  
- Associate loot lists with logged-in users.  
- Allow each user to view/manage only their items.  

**Alternative (short-term option):**  
Skip auth and display a shared list for quick testing.  

**Deliverables:**
- User registration + login flow.  
- User dashboard to display loot list.  
- Security: items tied to correct `user_id`.  

---

## Sprint 5 – Campaigns & DM Features
**Goals:**
- Create campaigns that hold multiple players.  
- Assign a DM to each campaign.  
- DM can see combined loot pools of all players.  

**Deliverables:**
- `campaigns` table fully implemented.  
- Function: `addUserToCampaign(campaignId, userId)`  
- DM dashboard to view all players in campaign.  

---

## Sprint 6 – Loot Generation & Gold Integration
**Goals:**
- Build loot generation logic for DM:  
  - Pull from campaign’s players’ loot pools.  
  - Difficulty levels (4 tiers, scaling loot quality).  
- Mark chosen items as received or remove them.  
- Integrate with existing **gold generation** function.  

**Deliverables:**
- Function: `generateLoot(campaignId, difficultyLevel)`  
- Items flagged as received or deleted.  
- Loot output includes items + gold.  
- UI for DM to trigger loot generation.  

---

## Future Enhancements (Backlog)
- Trade system between players.  
- Item history logs (audit trail of received loot).  
- UI polish & responsive layouts.  
- Advanced rarity/weighting logic.  
- **Note:**  
  Look into handling and displaying **equipment packs** (e.g., packs that contain multiple items) in the loot generation and item

---

## Database Schema (Proposed)

### Users Table
| Field     | Type        | Notes                        |
|-----------|-------------|------------------------------|
| id        | UUID / INT  | Primary key                  |
| name      | TEXT        | Player’s display name        |
| class     | TEXT        | Player’s class (e.g. Fighter, Wizard) |
| created_at| TIMESTAMP   | Record creation time         |

---

### Items Table
| Field     | Type        | Notes                        |
|-----------|-------------|------------------------------|
| id        | UUID / INT  | Primary key                  |
| user_id   | UUID / INT  | Foreign key → Users(id)      |
| name      | TEXT        | Item name                    |
| rarity    | TEXT        | e.g., Common, Rare, Legendary|
| obtained  | BOOLEAN     | Default `false`, set `true` when received |
| metadata  | JSONB       | Flexible field for extra data (damage, type, etc.) |
| created_at| TIMESTAMP   | Record creation time         |

---

### Campaigns Table
| Field     | Type        | Notes                        |
|-----------|-------------|------------------------------|
| id        | UUID / INT  | Primary key                  |
| name      | TEXT        | Campaign name                |
| dm_id     | UUID / INT  | Foreign key → Users(id), the DM |
| created_at| TIMESTAMP   | Record creation time         |

---

### Campaign Players Table (Join Table)
| Field       | Type        | Notes                        |
|-------------|-------------|------------------------------|
| id          | UUID / INT  | Primary key                  |
| campaign_id | UUID / INT  | Foreign key → Campaigns(id)  |
| user_id     | UUID / INT  | Foreign key → Users(id)      |
| role        | TEXT        | "player" or "dm" (optional redundancy for clarity) |
| joined_at   | TIMESTAMP   | Record of when they joined   |
